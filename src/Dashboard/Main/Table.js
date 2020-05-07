import { connect } from 'react-redux';
import TableComponent from './TableComponent';
import { withRouter } from 'react-router-dom';
import { positionDelete, magazineTypeDelete, orderTypeDelete, transTypeDelete } from '../../redux/actions/userActionCreators';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        positionDelete: (payload) => dispatch(positionDelete(payload)),
        magazineTypeDelete: (payload) => dispatch(magazineTypeDelete(payload)),
        orderTypeDelete: (payload) => dispatch(orderTypeDelete(payload)),
        transTypeDelete: (payload) => dispatch(transTypeDelete(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableComponent));