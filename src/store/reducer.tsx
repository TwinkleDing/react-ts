import { getStore, setStore } from "../utils/storage";
import { PROJECT_NAME, LOCAL_STORAGE } from "../utils/common";

let defaultState = getStore({
    name: PROJECT_NAME,
    type: LOCAL_STORAGE
});

defaultState = defaultState ? defaultState : {};

interface StateType {
    user: string,
    avatar: string
}


export default (state: any = defaultState, action: any): StateType => {
    let newState: StateType = Object.assign({}, state);

    switch (action.type) {
        case "USER":
            newState.user = action;
            break;
        case "AVATAR":
            newState.avatar = action;
            break;
        default:
            console.log(newState);
            break;
    }

    setStore({
        name: PROJECT_NAME,
        type: LOCAL_STORAGE,
        content: newState
    });
    return newState;

};
