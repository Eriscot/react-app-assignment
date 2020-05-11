import { connect } from "react-redux";
import { getSubscriptions } from "../../redux/actions/userActionCreators";
import SubscriptionsComponent from "./SubscriptionsComponent";
import { withRouter } from "react-router-dom";

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubscriptionsComponent));