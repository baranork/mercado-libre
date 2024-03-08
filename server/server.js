const { default: axios } = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

function formatItems(data) {
    return data.map(item => ({
        id: item.id,
        title: item.title,
        price: {
            currency: item.currency_id,
            price: parseInt(item.price),
            decimals: Math.round((item.price - parseInt(item.price)) * 100)
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping
    }));
}

function formatCategories(data) {
    let categories = []

    if (data.filters[0]?.values[0]) {
        const unfilteredCategories = data.filters[0].values[0]

        if (unfilteredCategories.path_from_root && unfilteredCategories.path_from_root.length > 0) {
            unfilteredCategories.path_from_root.forEach(category => {
                categories.push(category.name);
            });
        }
        else {
            categories.push(unfilteredCategories.name)
        }
    }


    return categories
}

app.get('/api/items', async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);

        const data = response.data;
        const processedData = {
            author: {
                name: 'Facundo',
                lastname: 'Seib'
            },
            categories: formatCategories(data),
            items: formatItems(data.results.slice(0, 4))
        }

        res.json(processedData);
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/items/:id', async (req, res) => {

    try {
        const response = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}`);
        const description = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}/description`);
        const data = response.data;
        const processedData = {
            author: {
                name: 'Facundo',
                lastname: 'Seib'
            },
            item: {
                id: data.id,
                title: data.title,
                price: {
                    currency: data.currency_id,
                    amount: parseInt(data.price).toString(),
                    decimals: Math.round((data.price - parseInt(data.price)) * 100)
                },
                picture: data.thumbnail,
                condition: data.condition,
                free_shipping: data.shipping.free_shipping,
                sold_quantity: data.initial_quantity,
                description: description.data.plain_text
            }
        }

        res.json(processedData)
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});