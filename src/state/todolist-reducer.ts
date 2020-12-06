import {FilterValuesType, TodoListType} from "../App"
import {v1} from "uuid";
import {
    AddTodoListActionType,
    AllActionTypes, ChangeTodoListFilterActionType,
    ChangeTodoListTitleActionType,
    RemoveTodoListActionType
} from "./actionTypes";

export const todolistsReducer = (state: Array<TodoListType>, action: AllActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {id: v1(), title: action.title, filter: "all"}
            return [
                ...state,
                newTodoList
            ]
        case 'CHANGE-TODOLIST-TITLE':

            return [
                ...state.map(tl =>
                    (tl.id === action.id) ? {...tl, title: action.title} : tl
                )
            ]
        case 'CHANGE-TODOLIST-FILTER':
            return [
                ...state.map(tl =>
                    (tl.id === action.id) ? {...tl, filter: action.filter} : tl
                )
            ]
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListAC = (todolistId: string): RemoveTodoListActionType =>
    ({type: 'REMOVE-TODOLIST', id: todolistId})

export const AddTodolistAC = (title: string): AddTodoListActionType =>
    ({type: "ADD-TODOLIST", title})

export const ChangeTodolistAC = (todolistId: string, title: string): ChangeTodoListTitleActionType =>
    ({type: "CHANGE-TODOLIST-TITLE", id: todolistId, title})

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterActionType =>
    ({type: "CHANGE-TODOLIST-FILTER", filter, id: todolistId})