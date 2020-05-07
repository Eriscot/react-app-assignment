import { connect } from "react-redux";
import { getClients } from "../../redux/actions/userActionCreators";
import ClientsComponent from "./ClientsComponent";

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getClients: () => dispatch(getClients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsComponent);