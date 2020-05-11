import { withRouter } from "react-router-dom";
import { getWorkers, getClients, getMagazines, getSubscriptions, subscriptionSubmit } from "../../redux/actions/userActionCreators";
import { connect } from "react-redux";
import SubscriptionsFormComponent from "./SubscriptionsFormComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        subscriptions: state.subscriptions,
        workers: state.workers,
        clients: state.clients,
        magazines: state.magazines,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        subscriptionSubmit: (payload) => dispatch(subscriptionSubmit(payload)),
        getSubscriptions: () => dispatch(getSubscriptions),
        getWorkers: () => dispatch(getWorkers()),
        getClients: () => dispatch(getClients()),
        getMagazines: () => dispatch(getMagazines()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubscriptionsFormComponent));