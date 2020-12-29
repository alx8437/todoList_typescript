import {FilterValuesType} from "../AppWithRedux";

export enum TODOLIST_ACTIONS_TYPE {
    REMOVE_TODOLIST = 'App/REMOVE_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'App/CHANGE_TODOLIST_TITLE',
    ADD_TODOLIST = 'App/ADD_TODOLIST',
    CHANGE_TODOLIST_FILTER = 'App/CHANGE_TODOLIST_FILTER',
}

export type RemoveTodoListActionType = {
    type: TODOLIST_ACTIONS_TYPE.REMOVE_TODOLIST,
    id: string,
}

export type ChangeTodoListTitleActionType = {
    type: TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE,
    id: string,
    title: string,
}

export type AddTodoListActionType = {
    type: TODOLIST_ACTIONS_TYPE.ADD_TODOLIST,
    title: string,
    id: string,
}

export type ChangeTodoListFilterActionType = {
    type: TODOLIST_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER
    id: string,
    filter: FilterValuesType,
}


export type AllTodolistActionTypes = RemoveTodoListActionType | ChangeTodoListTitleActionType
    | AddTodoListActionType | ChangeTodoListFilterActionType

