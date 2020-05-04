import { connect } from "react-redux";
import MagazinesComponent from "./MagazinesComponent";
import { getMagazines } from "../../redux/actions/userActionCreators";

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMagazines: () => dispatch(getMagazines())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MagazinesComponent);