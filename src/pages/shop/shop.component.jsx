import React from 'react'
import SHOP_DATA from './shop_data'
import CollectionPreview from '../../components/collection-preview/collection-preview.component'


class ShopPage extends React.Component{
    state = {
        collection : SHOP_DATA
    }

    render(){
        const {collection} = this.state
        return (
            <div className="shop-page">
                <h1>Shop Page</h1>
                {collection.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                ))}
            </div>
        )
    }
}

export default ShopPage;