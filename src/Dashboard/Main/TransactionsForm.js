import { withRouter } from "react-router-dom";
import { getWorkers, getClients, getTransTypes, transactionSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import TransactionsFormComponent from "./TransactionsFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        transactions: state.transactions,
        transtypes: state.transtypes,
        workers: state.workers,
        clients: state.clients,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        transactionSubmit: (payload) => dispatch(transactionSubmit(payload)),
        getTransTypes: () => dispatch(getTransTypes()),
        getWorkers: () => dispatch(getWorkers()),
        getClients: () => dispatch(getClients())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsFormComponent));