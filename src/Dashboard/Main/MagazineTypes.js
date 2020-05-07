import { connect } from "react-redux";
import { getMagazineTypes } from "../../redux/actions/userActionCreators";
import MagazineTypesComponent from "./MagazineTypesComponent";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMagazineTypes: () => dispatch(getMagazineTypes())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MagazineTypesComponent));