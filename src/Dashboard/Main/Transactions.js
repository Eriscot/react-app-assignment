import { connect } from "react-redux";
import { getTransactions } from "../../redux/actions/userActionCreators";
import TransactionsComponent from "./TransactionsComponent";

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTransactions: () => dispatch(getTransactions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsComponent);