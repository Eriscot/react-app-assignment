import { withRouter } from "react-router-dom";
import { getMagazineTypes, magazineSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import MagazineFormComponent from "./MagazineFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        magazines: state.magazines,
        magazinetypes: state.magazinetypes,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        magazineSubmit: (payload) => dispatch(magazineSubmit(payload)),
        getMagazineTypes: () => dispatch(getMagazineTypes())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MagazineFormComponent));