import React from 'react'
import './collection-overview.styles.scss'
import CollectionPreview from '../collection-preview/collection-preview.component'
import { connect } from 'react-redux'
import { selectShopCollections } from '../../redux/shop/shop.selectors'



const CollectionOverview = ({collections})=> (
    <div className="collections-overview">
        {collections.map(({id, ...otherCollectionProps}) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
    </div>
)

const mapStateToProps = (state) => ({
    collections: selectShopCollections(state)
})

export default connect(mapStateToProps)(CollectionOverview);