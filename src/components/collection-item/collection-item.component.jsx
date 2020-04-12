import React from 'react'
import './collection-item.styles.scss'
import CustomButton from '../custom-button/custom-button.component'


const CollectionItem = ({name,price, imageUrl}) => (
    <div className="collection-item">
        <div className="image" style={{backgroundImage:`url(${imageUrl})`}}></div>
        <div className="footer">
            <div className="name">{name}</div>
            <div className="price">{price}</div>
        </div>
        <CustomButton inverted>Add To Cart</CustomButton>
    </div>
)

export default CollectionItem;