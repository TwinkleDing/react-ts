let defaultState = localStorage.getItem("persist:root");

defaultState = defaultState ? JSON.parse(defaultState) : {};

interface StateType {
    user: string,
    avatar: string
}


export default (state: any = defaultState, action: any): StateType => {
    let newState: StateType = Object.assign({}, state);

    switch (action.type) {
        case "USER":
            newState.user = action;
            return newState;
        case "AVATAR":
            newState.avatar = action;
            return newState;
        default:
            return state;
    }
};
