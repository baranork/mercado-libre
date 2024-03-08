import React from 'react'
import SearchBox from '../components/SearchBox/SearchBox'
import { Route, Routes } from 'react-router-dom'
import ProductList from '../components/ProductList/ProductList'
import ProductDetail from '../components/ProductDetail/ProductDetail'

export default function AppRouter() {
    return (
        <>
            <SearchBox />
            <Routes>
                <Route path="/" element={<></>} />
                <Route path="/items" element={<ProductList />} />
                <Route path="/items/:id" element={<ProductDetail />} />
            </Routes>
        </>

    )
}   
