import {v1} from "uuid";
import {
    TODOLIST_ACTIONS_TYPE,
    AddTodoListActionType, AllTodolistActionTypes,
    ChangeTodoListFilterActionType,
    ChangeTodoListTitleActionType,
    RemoveTodoListActionType,
} from "./todolistsActionsTypes";
import { FilterValuesType, TodolistType } from "../AppWithRedux";

const initialState: Array<TodolistType> = [];

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: AllTodolistActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case TODOLIST_ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)
        case TODOLIST_ACTIONS_TYPE.ADD_TODOLIST:
            const newTodoList: TodolistType = {id: action.id, title: action.title, filter: "all"}
            return [
                ...state,
                newTodoList
            ];
        case TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE:
            return [
                ...state.map(tl =>
                    (tl.id === action.id) ? {...tl, title: action.title} : tl
                )
            ];
        case TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER:
            return [
                ...state.map(tl =>
                    (tl.id === action.id) ? {...tl, filter: action.filter} : tl
                )
            ];
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType =>
    ({type: TODOLIST_ACTIONS_TYPE.REMOVE_TODOLIST, id: todolistId})

export const addTodolistAC = (title: string): AddTodoListActionType =>
    ({type: TODOLIST_ACTIONS_TYPE.ADD_TODOLIST, title, id: v1()})

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodoListTitleActionType =>
    ({type: TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE, id: todolistId, title})

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterActionType =>
    ({type: TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER, filter, id: todolistId})