import { withRouter } from "react-router-dom";
import { getClients, getOrderTypes, getOrders, orderSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import OrdersFormComponent from "./OrdersFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        orders: state.orders,
        ordertypes: state.ordertypes,
        clients: state.clients,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderSubmit: (payload) => dispatch(orderSubmit(payload)),
        getOrderTypes: () => dispatch(getOrderTypes()),
        getOrders: () => dispatch(getOrders()),
        getClients: () => dispatch(getClients())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrdersFormComponent));