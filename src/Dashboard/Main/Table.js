import { connect } from 'react-redux';
import TableComponent from './TableComponent';

const mapStateToProps = state => {
    return {
        error: state.error
    }
}

export default connect(mapStateToProps, null)(TableComponent);