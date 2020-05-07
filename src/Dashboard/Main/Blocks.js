import { connect } from "react-redux";
import { getBlocks } from "../../redux/actions/userActionCreators";
import BlocksComponent from "./BlocksComponent";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBlocks: () => dispatch(getBlocks())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlocksComponent));