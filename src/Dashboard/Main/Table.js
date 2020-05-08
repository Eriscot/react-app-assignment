import { connect } from 'react-redux';
import TableComponent from './TableComponent';
import { withRouter } from 'react-router-dom';
import { positionDelete, magazineTypeDelete, orderTypeDelete, transTypeDelete, districtDelete, blockDelete, magazineDelete, workerSubmit, clientDelete } from '../../redux/actions/userActionCreators';

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
        transTypeDelete: (payload) => dispatch(transTypeDelete(payload)),
        districtDelete: (payload) => dispatch(districtDelete(payload)),
        blockDelete: (payload) => dispatch(blockDelete(payload)),
        magazineDelete: (payload) => dispatch(magazineDelete(payload)),
        workerDelete: (payload) => dispatch(workerSubmit(payload)),
        clientDelete: (payload) => dispatch(clientDelete(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableComponent));