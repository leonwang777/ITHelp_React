import { combineReducers } from "redux";
import { PLUS, MINUS } from "../actions/action.js";

const initialData = {
    value: 0
};

console.log(initialData);
// function calculator(state = initialData, action) {
const counter = (state = initialData, action) => {
    switch (action.type) {
        case PLUS:
            console.log("++");
            return Object.assign({}, state, {
                value: state.value + action.num
            });
        case MINUS:
            console.log("--");
            return Object.assign({}, state, {
                value: state.value - action.num
            });
        default:
            return state;
    }
};

// combine state, actions, and dispatcher (reducer)
const calculatorApp = combineReducers({ counter });

export default calculatorApp;
