import { connect } from "react-redux";
import StateBoard from "../components/StateBoard.jsx";
import { add, sub } from "../actions/action.js";

const mapStateToProps = state => ({
    value: state.counter.value
});

const mapDispatchToProps = dispatch => ({
    onClickAdd: () => {
        console.log("Click Add");
        dispatch(add());
    },
    onClickSub: () => {
        console.log("Click Substract");
        dispatch(sub());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StateBoard);
