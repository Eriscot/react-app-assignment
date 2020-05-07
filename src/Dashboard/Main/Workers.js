import { connect } from "react-redux";
import { getWorkers } from "../../redux/actions/userActionCreators";
import WorkersComponent from "./WorkersComponent";

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getWorkers: () => dispatch(getWorkers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkersComponent);