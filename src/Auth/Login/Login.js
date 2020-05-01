import LoginComponent from './LoginComponent';
import { userLogin } from '../../redux/actions/userActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userLogin: (payload) => dispatch(userLogin(payload)) 
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);