import { withRouter } from "react-router-dom";
import { getPositions, workerSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import WorkersFormComponent from "./WorkersFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        positions: state.positions,
        workers: state.workers,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        workerSubmit: (payload) => dispatch(workerSubmit(payload)),
        getPositions: () => dispatch(getPositions())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkersFormComponent));