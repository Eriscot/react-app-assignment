import { connect } from "react-redux";
import AppComponent from "./AppComponent";
import { errorOff } from "./redux/actions/errorActionCreators";

const mapStateToProps = state => {
    return {
        user: state.user,
        loading: state.loading,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        errorOff: () => dispatch(errorOff())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);