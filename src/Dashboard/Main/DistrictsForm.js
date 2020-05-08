import { withRouter } from "react-router-dom";
import { getWorkers, districtSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import DistrictsFormComponent from "./DistrictsFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        districts: state.districts,
        workers: state.workers,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        districtSubmit: (payload) => dispatch(districtSubmit(payload)),
        getWorkers: () => dispatch(getWorkers())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DistrictsFormComponent));