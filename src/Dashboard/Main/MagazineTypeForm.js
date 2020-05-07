import { withRouter } from "react-router-dom";
import { magazineTypeSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import MagazineTypeFormComponent from "./MagazineTypeFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        magazineTypeSubmit: (payload) => dispatch(magazineTypeSubmit(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MagazineTypeFormComponent));