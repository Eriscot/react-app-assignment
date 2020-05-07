import { connect } from "react-redux";
import { getDistricts } from "../../redux/actions/userActionCreators";
import DistrictsComponent from "./DistrictsComponent";

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDistricts: () => dispatch(getDistricts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistrictsComponent);