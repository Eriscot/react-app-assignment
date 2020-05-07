import { connect } from "react-redux";
import PositionsComponent from "./PositionsComponent";
import { getPositions } from "../../redux/actions/userActionCreators";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPositions: () => dispatch(getPositions())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PositionsComponent));