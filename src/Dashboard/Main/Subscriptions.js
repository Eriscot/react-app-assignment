import { connect } from "react-redux";
import { getSubscriptions } from "../../redux/actions/userActionCreators";
import SubscriptionsComponent from "./SubscriptionsComponent";

const mapStateToProps = state => {
    return {
        lastLoaded: state.lastLoaded,
        subscriptions: state.subscriptions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSubscriptions: () => dispatch(getSubscriptions())
    }
}

console.log('test');

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsComponent);