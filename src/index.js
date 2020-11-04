import React from "react";
import ReactDom from "react-dom";
import Home from "./components/Home";
import "./css/style.css";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {rootReducer} from "./redux/rootReducer";

const store = createStore(rootReducer);
ReactDom.render(
    <React.StrictMode>
        <Home />
    </React.StrictMode>,
    document.getElementById("root")
)
