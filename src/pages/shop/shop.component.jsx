import React from 'react'
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import { Route} from 'react-router-dom';
import CollectionPage from '../collection/collection-page.component';
import { connect } from 'react-redux';
import { fetchCollectionAsync } from '../../redux/shop/shop.actions';
import { createStructuredSelector } from 'reselect';
import { selectCollectionLoading, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';


class ShopPage extends React.Component {

    componentDidMount(){
        const {fetchCollectionAsync} = this.props;
        fetchCollectionAsync()
    }
    render(){
        const {match, isLoaded} = this.props;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render = { (props) => <CollectionsOverview isLoading={!isLoaded} {...props}/> } />
                <Route path={`${match.path}/:collectionId`} render= {(props)=> <CollectionPage isLoading={!isLoaded} {...props}/> } />
            </div>
        )
    } 
}

const mapDispatchToProps = (dispatch) =>({
    fetchCollectionAsync :() =>  dispatch(fetchCollectionAsync())
})

const mapStateToProps= createStructuredSelector({
    isLoading : selectCollectionLoading,
    isLoaded :selectIsCollectionLoaded
})

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);