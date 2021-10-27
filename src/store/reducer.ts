let defaultState = localStorage.getItem("persist:root");

defaultState = defaultState ? JSON.parse(defaultState) : {};

export default (state = defaultState , action) => {
    let newState = Object.assign({}, state);

    switch(action.type) {
    case "USER":
        newState.user=action;
        return newState;
    case "AVATAR":
        newState.avatar=action;
        return newState;
    default:
        return state;
    }
};