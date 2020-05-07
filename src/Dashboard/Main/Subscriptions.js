import { connect } from "react-redux";
import { getSubscriptions } from "../../redux/actions/userActionCreators";
import SubscriptionsComponent from "./SubscriptionsComponent";

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSubscriptions: () => dispatch(getSubscriptions())
    }
}

console.log('test');

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsComponent);