import { withRouter } from "react-router-dom";
import PositionFormComponent from "./PositionFormComponent";
import { positionSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        positions: state.positions,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        positionSubmit: (payload) => dispatch(positionSubmit(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PositionFormComponent));