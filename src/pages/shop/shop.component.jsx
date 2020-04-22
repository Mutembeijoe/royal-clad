import React from 'react'
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import { Route} from 'react-router-dom';
import CollectionPage from '../collection/collection-page.component';
import { firestore, convertCollectSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollection } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {

    state = {
        loading : true
    }
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
        const {match} = this.props;
        const {loading} = this.state
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render= {(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/> } />
                <Route path={`${match.path}/:collectionId`} render= {(props)=> <CollectionPageWithSpinner isLoading={loading} {...props}/> } />
            </div>
        )
    } 
}
const mapDispatchToProps = (dispatch) =>({
    updateCollection :(collectionMap) =>  dispatch(updateCollection(collectionMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);