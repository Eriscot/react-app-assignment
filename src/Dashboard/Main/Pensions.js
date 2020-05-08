import { connect } from "react-redux";
import { getPensions } from "../../redux/actions/userActionCreators";
import PensionsComponent from "./PensionsComponent";

const mapStateToProps = state => {
    return {
        lastLoaded: state.lastLoaded,
        pensions: state.pensions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPensions: () => dispatch(getPensions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PensionsComponent);