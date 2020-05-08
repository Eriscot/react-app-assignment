import { connect } from "react-redux";
import { getOrders } from "../../redux/actions/userActionCreators";
import OrdersComponent from "./OrdersComponent";

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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);