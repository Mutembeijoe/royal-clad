import React from 'react'
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import { Route} from 'react-router-dom';
import CollectionPage from '../collection/collection-page.component';
import { firestore, convertCollectSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollection } from '../../redux/shop/shop.actions';


class ShopPage extends React.Component {
    unsuscribeFromSnapShot = null
    componentDidMount(){
        const {updateCollection} = this.props;
        const collectionRef =firestore.collection("collections")

        this.unsuscribeFromSnapShot = collectionRef.onSnapshot(snapshot => {
            const collectionMap = convertCollectSnapshotToMap(snapshot)
            updateCollection(collectionMap)
        })
    }
    render(){
        const {match} = this.props;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        )
    } 
}
const mapDispatchToProps = (dispatch) =>({
    updateCollection :(collectionMap) =>  dispatch(updateCollection(collectionMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);