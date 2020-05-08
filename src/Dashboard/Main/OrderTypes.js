import { connect } from "react-redux";
import { getOrderTypes } from "../../redux/actions/userActionCreators";
import OrderTypesComponent from "./OrderTypesComponent";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
    console.log(state.ordertypes, state.lastLoaded);
    return {
        lastLoaded: state.lastLoaded,
        ordertypes: state.ordertypes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrderTypes: () => dispatch(getOrderTypes())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderTypesComponent));