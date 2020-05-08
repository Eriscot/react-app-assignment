import { withRouter } from "react-router-dom";
import { orderTypeSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import OrderTypeFormComponent from "./OrderTypeFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        lastLoaded: state.lastLoaded,
        ordertypes: state.ordertypes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderTypeSubmit: (payload) => dispatch(orderTypeSubmit(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderTypeFormComponent));