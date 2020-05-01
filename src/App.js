import { connect } from "react-redux";
import AppComponent from "./AppComponent";

const mapStateToProps = state => {
    return {
        user: state.user,
        loading: state.loading
    };
}

export default connect(
    mapStateToProps,
    null
)(AppComponent);