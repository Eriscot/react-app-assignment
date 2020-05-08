import { connect } from "react-redux";
import PositionsComponent from "./PositionsComponent";
import { getPositions } from "../../redux/actions/userActionCreators";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
    console.log(state.lastLoaded);
    return {
        ...ownProps,
        positions: state.positions,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPositions: () => dispatch(getPositions())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PositionsComponent));