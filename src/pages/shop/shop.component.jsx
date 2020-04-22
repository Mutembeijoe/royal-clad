import React from 'react'
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import { Route} from 'react-router-dom';
import CollectionPage from '../collection/collection-page.component';
import { firestore, convertCollectSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollection } from '../../redux/shop/shop.actions';
import { createStructuredSelector } from 'reselect';
import { selectCollectionLoading } from '../../redux/shop/shop.selectors';


class ShopPage extends React.Component {

    unsuscribeFromSnapShot = null
    componentDidMount(){
        const {updateCollection} = this.props;
        const collectionRef =firestore.collection("collections")

        this.unsuscribeFromSnapShot = collectionRef.onSnapshot(snapshot => {
            const collectionMap = convertCollectSnapshotToMap(snapshot)
            updateCollection(collectionMap)
            this.setState({loading:false})
        })
    }
    render(){
        const {match, isLoading} = this.props;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render = { (props) => <CollectionsOverview isLoading={isLoading} {...props}/> } />
                <Route path={`${match.path}/:collectionId`} render= {(props)=> <CollectionPage isLoading={isLoading} {...props}/> } />
            </div>
        )
    } 
}
const mapDispatchToProps = (dispatch) =>({
    updateCollection :(collectionMap) =>  dispatch(updateCollection(collectionMap))
})

const mapStateToProps= createStructuredSelector({
    isLoading : selectCollectionLoading
})

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);