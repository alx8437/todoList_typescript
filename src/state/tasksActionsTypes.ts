import {AddTodoListActionType, RemoveTodoListActionType} from "./todolistsActionsTypes";

export enum TASKS_ACTIONS_TYPE {
    REMOVE_TASK = 'App/Todolists/REMOVE_TASK',
    ADD_TASK = 'App/Todolists/ADD_TASK',
    CHANGE_TASK_STATUS = 'App/Todolists/CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'App/Todolists/CHANGE_TASK_TITLE',
}

export type RemoveTaskActionType = {
    type: TASKS_ACTIONS_TYPE.REMOVE_TASK,
    taskId: string,
    todolistId: string,
}


export type AddTaskActionType = {
    type: TASKS_ACTIONS_TYPE.ADD_TASK,
    title: string,
    todolistId: string,
    taskId: string,
}

export type ChangeTaskStatusActionType = {
    type: TASKS_ACTIONS_TYPE.CHANGE_TASK_STATUS,
    taskId: string,
    status: boolean,
    todolistId: string,
}

export type ChangeTaskTitleActionType = {
    type: TASKS_ACTIONS_TYPE.CHANGE_TASK_TITLE,
    todolistId: string
    taskId: string,
    title: string,
}


export type AllTaskActionTypes = RemoveTaskActionType
    | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodoListActionType | RemoveTodoListActionType

