import { connect } from 'react-redux';
import StateBoard from 'StateBoard.jsx';
import { add, sub } from '../../action.js';

const mapStateToProps = (state) => {
    return { 
        value: state.calcuator.value 
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        onClickAdd: () => {dispatch(add());},
        onClickSub: () => {dispatch(sub());}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StateBoard);
