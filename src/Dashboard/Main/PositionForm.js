import { withRouter } from "react-router-dom";
import PositionFormComponent from "./PositionFormComponent";
import { positionSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        positionSubmit: (payload) => dispatch(positionSubmit(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PositionFormComponent));