import { withRouter } from "react-router-dom";
import { getDistricts, blockSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import BlockFormComponent from "./BlocksFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        districts: state.districts,
        blocks: state.blocks,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        blockSubmit: (payload) => dispatch(blockSubmit(payload)),
        getDistricts: () => dispatch(getDistricts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlockFormComponent));