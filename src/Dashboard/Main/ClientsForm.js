import { withRouter } from "react-router-dom";
import { getBlocks, clientSubmit } from "../../redux/actions/userActionCreators";
import ClientsFormComponent from './ClientsFormComponent';
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        blocks: state.blocks,
        clients: state.clients,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clientSubmit: (payload) => dispatch(clientSubmit(payload)),
        getBlocks: () => dispatch(getBlocks())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientsFormComponent));