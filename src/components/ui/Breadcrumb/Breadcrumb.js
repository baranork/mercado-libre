import React from 'react'
import './Breadcrumb.scss'

export default function Breadcrumb({ categories }) {
    return (
        <div className='breadcrumb'>
            {categories.map((category, index) => {
                return index === categories.length - 1 ? category : `${category} > `
            })}
        </div>
    )
}
