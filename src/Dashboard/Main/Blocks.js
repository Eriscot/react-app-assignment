import { connect } from "react-redux";
import { getBlocks } from "../../redux/actions/userActionCreators";
import BlocksComponent from "./BlocksComponent";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
    console.log(state.blocks, state.lastLoaded);
    return {
        ...ownProps,
        blocks: state.blocks,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBlocks: () => dispatch(getBlocks())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlocksComponent));