import { connect } from "react-redux";
import { getTransTypes } from "../../redux/actions/userActionCreators";
import TransTypesComponent from "./TransTypesComponent";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
    return {
        lastLoaded: state.lastLoaded,
        transtypes: state.transtypes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTransTypes: () => dispatch(getTransTypes())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransTypesComponent));