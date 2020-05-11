import { connect } from "react-redux";
import { getOrders } from "../../redux/actions/userActionCreators";
import OrdersComponent from "./OrdersComponent";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
    return {
        lastLoaded: state.lastLoaded,
        orders: state.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(getOrders())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrdersComponent));