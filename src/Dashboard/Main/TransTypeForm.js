import { withRouter } from "react-router-dom";
import { transTypeSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import TransTypeFormComponent from "./TransTypeFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        transTypeSubmit: (payload) => dispatch(transTypeSubmit(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransTypeFormComponent));