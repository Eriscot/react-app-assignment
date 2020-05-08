import { withRouter } from "react-router-dom";
import { magazineTypeSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import MagazineTypeFormComponent from "./MagazineTypeFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        magazinetypes: state.magazinetypes,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        magazineTypeSubmit: (payload) => dispatch(magazineTypeSubmit(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MagazineTypeFormComponent));