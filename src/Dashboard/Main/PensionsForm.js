import { withRouter } from "react-router-dom";
import { getWorkers, getClients, pensionSubmit } from "../../redux/actions/userActionCreators";
import PensionsFormComponent from './PensionsFormComponent';
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        pensions: state.pensions,
        workers: state.workers,
        clients: state.clients,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        pensionSubmit: (payload) => dispatch(pensionSubmit(payload)),
        getClients: () => dispatch(getClients()),
        getWorkers: () => dispatch(getWorkers()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PensionsFormComponent));