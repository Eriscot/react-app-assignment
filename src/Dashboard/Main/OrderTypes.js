import { connect } from "react-redux";
import { getOrderTypes } from "../../redux/actions/userActionCreators";
import OrderTypesComponent from "./OrderTypesComponent";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrderTypes: () => dispatch(getOrderTypes())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderTypesComponent));