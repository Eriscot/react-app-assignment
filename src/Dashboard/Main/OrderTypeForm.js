import { withRouter } from "react-router-dom";
import { orderTypeSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import OrderTypeFormComponent from "./OrderTypeFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderTypeSubmit: (payload) => dispatch(orderTypeSubmit(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderTypeFormComponent));