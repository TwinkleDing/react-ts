import { createStore } from "redux";
import reducers from "./reducer";

// 创建store
const store = createStore(reducers);

export default store;
