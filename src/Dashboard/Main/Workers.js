import { connect } from "react-redux";
import { getWorkers } from "../../redux/actions/userActionCreators";
import WorkersComponent from "./WorkersComponent";

const mapStateToProps = state => {
    return {
        lastLoaded: state.lastLoaded,
        workers: state.workers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getWorkers: () => dispatch(getWorkers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkersComponent);