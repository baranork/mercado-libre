import React from 'react'
import './ProductCard.scss'
import { getCurrency } from '../../helpers/priceHelper'
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, isLast }) {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate('/items/' + product.id);
    }
    return (
        <>
            <div className='card'>
                <div>
                    <img className='productThumbnail' src={product.picture} onClick={handleProductClick} />
                </div>
                <div className='productInfo'>
                    <div className='productPrice' onClick={handleProductClick}>
                        {`${getCurrency(product.price.currency)} ${product.price.price},${product.price.decimals}`}
                    </div>
                    <div className='productTitle' onClick={handleProductClick}>
                        {product.title}
                    </div>
                </div>
            </div>
            {
                isLast ?
                    <></> :
                    <div className='divider' />

            }
        </>

    )
}
