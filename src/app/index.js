import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import calculatorApp from "./reducers/reducers.js";
import App from "./components/App.jsx";
import { add, sub } from "./actions/action.js";

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(calculatorApp);
console.log("Print out store");
console.log(store);
console.log("Print out store.getstate()");
console.log(store.getState());

// 可以手动订阅更新，也可以事件绑定到视图层。
// store.subscribe(() => console.log(store.getState()))
// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
// store.dispatch({ type: 'PLUS' })
// 1
// store.dispatch({ type: 'PLUS' })
// 2
// store.dispatch({ type: 'MINUS' })
// 1

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);
