import { connect } from "react-redux";
import { getOrders } from "../../redux/actions/userActionCreators";
import OrdersComponent from "./OrdersComponent";

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(getOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);