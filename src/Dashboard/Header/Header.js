import { connect } from "react-redux";
import HeaderComponent from "./HeaderComponent";
import { userLogout } from "../../redux/actions/userActionCreators";

const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => dispatch(userLogout())
    }
}

export default connect(
    null,
    mapDispatchToProps
)(HeaderComponent);