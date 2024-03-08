import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getProductList } from '../../services/searchService';
import './ProductList.scss'
import ProductCard from '../ProductCard/ProductCard';
import Breadcrumb from '../ui/Breadcrumb/Breadcrumb';

export default function ProductList() {
    let location = useLocation();
    let queryParams = new URLSearchParams(location.search)
    let query = queryParams.get('search');

    const [productsList, setProductsList] = useState([])
    const [categoriesList, setCategoriesList] = useState([])

    useEffect(() => {
        fetchProducts(query).then((res) => {
            console.log(res)

            if (res.items) {
                setProductsList(res.items)
                setCategoriesList(res.categories)
            }
            else {
                console.log(res)
            }
        })
    }, [query])

    const fetchProducts = async (query) => {
        try {
            return await getProductList(query);
        } catch (error) {
            return error
        }
    }

    return (
        <div className='area'>
            <div className='resultsContainer'>
                <Breadcrumb categories={categoriesList} />
                <div className='productsContainer'>
                    {productsList.map((product, index) => (
                        <ProductCard key={product.id} product={product} isLast={index === productsList.length - 1} />
                    ))}
                </div>
            </div>
        </div>
    )
}
