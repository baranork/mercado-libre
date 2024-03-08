import React, { useEffect, useState } from 'react'
import Breadcrumb from '../ui/Breadcrumb/Breadcrumb'
import { useParams } from 'react-router-dom'
import { getProduct, getProductDescription } from '../../services/searchService'
import './ProductDetail.scss'
import { getCurrency } from '../../helpers/priceHelper'
import { getCondition } from '../../helpers/conditionHelper'

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [price, setPrice] = useState('')
    useEffect(() => {
        fetchProduct(id).then((res) => {
            setProduct(res.item)
            setIsLoading(false)
            setPrice(`${getCurrency(res.item.price.currency)} ${res.item.price.amount}, ${res.item.price.decimals}`)
        })

    }, [id])

    const fetchProduct = async (id) => {
        try {
            return await getProduct(id);
        } catch (error) {
            return error
        }
    }

    return (

        <div className='area'>


            <div className='resultsDetailContainer'>
                <Breadcrumb categories={[]} />
                {isLoading ? <></>
                    :
                    <div className='productsDetailContainer'>
                        <div className='infoContainer'>
                            <img className='productDetailPhoto' src={product.picture} />
                            <div className='productDetailInfoArea'>
                                <div className='productDetailSubtitle'>
                                    {getCondition(product.condition)} - {product.sold_quantity} vendidos
                                </div>
                                <div className='productDetailTitle'>
                                    {product.title}
                                </div>
                                <div className='productDetailPrice'>{price}</div>
                                <div className='buyButton'>Comprar</div>
                            </div>
                        </div>

                        <div className='productDetailDescriptionArea'>
                            <div className='productDetailDescriptionHeader'>
                                Descripcion del producto
                            </div>
                            <div className='productDetailDescription'>
                                {product.description}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}