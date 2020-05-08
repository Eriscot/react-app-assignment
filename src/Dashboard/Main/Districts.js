import { connect } from "react-redux";
import { getDistricts } from "../../redux/actions/userActionCreators";
import DistrictsComponent from "./DistrictsComponent";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
    return {
        districts: state.districts,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDistricts: () => dispatch(getDistricts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DistrictsComponent));