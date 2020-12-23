import {FilterValuesType, TodolistType} from "../App"
import {v1} from "uuid";
import {
    TODOLIST_ACTIONS_TYPE,
    AddTodoListActionType, AllTodolistActionTypes,
    ChangeTodoListFilterActionType,
    ChangeTodoListTitleActionType,
    RemoveTodoListActionType,
} from "./todolistsActionsTypes";

export const todolistsReducer = (state: Array<TodolistType>, action: AllTodolistActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case TODOLIST_ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)
        case TODOLIST_ACTIONS_TYPE.ADD_TODOLIST:
            const newTodoList: TodolistType = {id: action.id, title: action.title, filter: "all"}
            return [
                ...state,
                newTodoList
            ]
        case TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE:
            return [
                ...state.map(tl =>
                    (tl.id === action.id) ? {...tl, title: action.title} : tl
                )
            ]
        case TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER:
            debugger
            return [
                ...state.map(tl =>
                    (tl.id === action.id) ? {...tl, filter: action.filter} : tl
                )
            ]
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType =>
    ({type: TODOLIST_ACTIONS_TYPE.REMOVE_TODOLIST, id: todolistId})

export const addTodolistAC = (title: string): AddTodoListActionType =>
    ({type: TODOLIST_ACTIONS_TYPE.ADD_TODOLIST, title, id: v1()})

export const changeTodolistAC = (todolistId: string, title: string): ChangeTodoListTitleActionType =>
    ({type: TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE, id: todolistId, title})

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterActionType =>
    ({type: TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER, filter, id: todolistId})