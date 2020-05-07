import { connect } from "react-redux";
import { getPensions } from "../../redux/actions/userActionCreators";
import PensionsComponent from "./PensionsComponent";

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPensions: () => dispatch(getPensions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PensionsComponent);