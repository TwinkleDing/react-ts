import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// 存储对象，默认存储到localstorage
const persistConfig = {
    key: "root",
    storage,
    stateReconailer: autoMergeLevel2
};
// 重新组装reducer

const persistedReducer = persistReducer(persistConfig, reducers);

// 创建store
const store = createStore(persistedReducer);
// 应用redux-persist以完成数据持久化

persistStore(store);

export default store;