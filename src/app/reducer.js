import {combineReducer} from 'redux';
import {PLUS, MINUS} from 'action.js';

const initialData = {
    value: 0
}

// function calculator(state = initialData, action) {
function calculator(action, state = initialData) {
    switch (action.type) {
        case PLUS:
            console.log("++");
            return object.assign({}, state, { value: state.value + action.num});
        case MINUS:
            console.log("--");
            return object.assign({}, state, { value: state.value - action.num});
        default: 
            return state;
    }
}

// combine state, actions, and dispatcher (reducer)
const calculatorApp = combineReducer((
    calculator
));

export default calculatorApp;

