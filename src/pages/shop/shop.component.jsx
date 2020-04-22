import React from 'react'
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import { Route} from 'react-router-dom';
import CollectionPage from '../collection/collection-page.component';
import { firestore, convertCollectSnapshotToMap } from '../../firebase/firebase.utils';


class ShopPage extends React.Component {
    unsuscribeFromSnapShot = null
    componentDidMount(){
        const collectionRef =firestore.collection("collections")
        this.unsuscribeFromSnapShot = collectionRef.onSnapshot(snapshot => {
            const collectionObject = convertCollectSnapshotToMap(snapshot)
            console.log(collectionObject)
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

export default (ShopPage);