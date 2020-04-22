import React from 'react'
import './collection-overview.styles.scss'
import CollectionPreview from '../collection-preview/collection-preview.component'
import { connect } from 'react-redux'
import { selectCollectionsForPreview} from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-spinner/with-spinner.component'
import { createStructuredSelector } from 'reselect'



const CollectionsOverview = ({collections, isLoading})=> (
    <div className="collections-overview">
        {collections.map(({id, ...otherCollectionProps}) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview,
})


export default WithSpinner(connect(mapStateToProps)(CollectionsOverview));