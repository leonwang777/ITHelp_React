import React from 'react';
import PropTypes from 'prop-types';

const StateBoard = ({value, onClickAdd, onClickSub}) => (
    <div> 
        <h1>value: {value}</h1>
        <button onClick={() => onClickAdd()}>Plus  1 </button>
        <button onClick={() => onClickSub()}>Minus 1 </button>
    </div>
)

StateBoard.propTypes = {
    value: PropTypes.number.isRequired,
    onClickAdd: PropTypes.func.isRequired,
    onClickSub: PropTypes.func.isRequired
}
export default StateBoard;
