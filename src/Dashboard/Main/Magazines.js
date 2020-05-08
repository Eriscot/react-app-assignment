import { connect } from "react-redux";
import MagazinesComponent from "./MagazinesComponent";
import { getMagazines } from "../../redux/actions/userActionCreators";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
    return {
        magazines: state.magazines,
        lastLoaded: state.lastLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMagazines: () => dispatch(getMagazines())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MagazinesComponent));