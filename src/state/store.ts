import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reduser";
import {todolistsReducer} from "./todolist-reducer";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

export type AppRootStateType = ReturnType<typeof rootReducer>;