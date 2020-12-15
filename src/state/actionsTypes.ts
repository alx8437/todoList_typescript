import {FilterValuesType} from "../App";

export enum ACTIONS_TYPE {
    REMOVE_TODOLIST = 'App/Todolists/REMOVE_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'App/Todolists/CHANGE_TODOLIST_TITLE',
    ADD_TODOLIST = 'App/Todolists/ADD_TODOLIST',
    CHANGE_TODOLIST_FILTER = 'App/Todolists/CHANGE_TODOLIST_FILTER',
}

export type RemoveTodoListActionType = {
    type: ACTIONS_TYPE.REMOVE_TODOLIST,
    id: string,
}

export type ChangeTodoListTitleActionType = {
    type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE,
    id: string,
    title: string,
}

export type AddTodoListActionType = {
    type: ACTIONS_TYPE.ADD_TODOLIST,
    title: string,
}

export type ChangeTodoListFilterActionType = {
    type: ACTIONS_TYPE.CHANGE_TODOLIST_FILTER
    id: string,
    filter: FilterValuesType,
}

export type AllActionTypes = RemoveTodoListActionType | ChangeTodoListTitleActionType
    | AddTodoListActionType | ChangeTodoListFilterActionType

