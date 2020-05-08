import { connect } from "react-redux";
import { getClients } from "../../redux/actions/userActionCreators";
import ClientsComponent from "./ClientsComponent";

const mapStateToProps = state => {
    return {
        clients: state.clients,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getClients: () => dispatch(getClients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsComponent);