import { connect } from "react-redux";
import { getTransactions } from "../../redux/actions/userActionCreators";
import TransactionsComponent from "./TransactionsComponent";

const mapStateToProps = state => {
    return {
        lastLoaded: state.lastLoaded,
        transactions: state.transactions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTransactions: () => dispatch(getTransactions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsComponent);