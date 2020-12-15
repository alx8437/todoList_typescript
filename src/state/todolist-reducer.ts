import {FilterValuesType, TodoListType} from "../App"
import {v1} from "uuid";
import {
    ACTIONS_TYPE,
    AddTodoListActionType,
    AllActionTypes,
    ChangeTodoListFilterActionType,
    ChangeTodoListTitleActionType,
    RemoveTodoListActionType,
} from "./actionsTypes";

export const todolistsReducer = (state: Array<TodoListType>, action: AllActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)
        case ACTIONS_TYPE.ADD_TODOLIST:
            const newTodoList: TodoListType = {id: v1(), title: action.title, filter: "all"}
            return [
                ...state,
                newTodoList
            ]
        case ACTIONS_TYPE.CHANGE_TODOLIST_TITLE:
            return [
                ...state.map(tl =>
                    (tl.id === action.id) ? {...tl, title: action.title} : tl
                )
            ]
        case ACTIONS_TYPE.CHANGE_TODOLIST_FILTER:
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
    ({type: ACTIONS_TYPE.REMOVE_TODOLIST, id: todolistId})

export const AddTodolistAC = (title: string): AddTodoListActionType =>
    ({type: ACTIONS_TYPE.ADD_TODOLIST, title})

export const ChangeTodolistAC = (todolistId: string, title: string): ChangeTodoListTitleActionType =>
    ({type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE, id: todolistId, title})

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterActionType =>
    ({type: ACTIONS_TYPE.CHANGE_TODOLIST_FILTER, filter, id: todolistId})