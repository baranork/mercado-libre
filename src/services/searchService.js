export async function getProductList(query) {
    try {
        const response = await fetch(`/api/items?q=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getProduct(id) {
    try {
        const response = await fetch(`/api/items/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}