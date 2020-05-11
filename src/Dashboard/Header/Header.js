import { connect } from "react-redux";
import HeaderComponent from "./HeaderComponent";
import { userLogout } from "../../redux/actions/userActionCreators";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => dispatch(userLogout())
    }
}

export default withRouter(connect(
    null,
    mapDispatchToProps
)(HeaderComponent));