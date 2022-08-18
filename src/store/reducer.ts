import { getStore, setStore } from "@/utils/storage";
import { PROJECT_NAME, LOCAL_STORAGE } from "@/utils/common";
import { ActionType, UserInfo } from "@/interface";

type StateType = {
	userInfo: UserInfo;
	avatar: ActionType;
	token: ActionType;
};

let defaultState = getStore({
	name: PROJECT_NAME,
	type: LOCAL_STORAGE
});

defaultState = defaultState ? defaultState : {};

export default (state: any = defaultState, action: ActionType): StateType => {
	let newState: StateType = Object.assign({}, state);

	switch (action.type) {
		case "USER_INFO":
			newState.userInfo = action;
			break;
		case "AVATAR":
			newState.avatar = action;
			break;
		case "TOKEN":
			newState.token = action;
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
