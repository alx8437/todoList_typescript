import {TasksStateType} from "../App";
import {
    AddTaskActionType,
    AllTaskActionTypes,
    ChangeTaskStatusActionType,
    ChangeTaskTitleActionType,
    RemoveTaskActionType,
    TASKS_ACTIONS_TYPE
} from "./tasksActionsTypes";
import {TODOLIST_ACTIONS_TYPE} from "./todolistsActionsTypes";
import { v1 } from "uuid";

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: AllTaskActionTypes): TasksStateType => {
    switch (action.type) {
        case TASKS_ACTIONS_TYPE.REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            };
        case TASKS_ACTIONS_TYPE.ADD_TASK:
            const newTask = {id: action.taskId, title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            };
        case TASKS_ACTIONS_TYPE.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t =>
                    t.id === action.taskId ? {...t, isDone: action.status} : t)
            };
        case TASKS_ACTIONS_TYPE.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t =>
                    t.id === action.taskId ? {...t, title: action.title} : t)
            };
        case TODOLIST_ACTIONS_TYPE.ADD_TODOLIST:
            return {
                ...state, [action.id]: []
            };
        case TODOLIST_ACTIONS_TYPE.REMOVE_TODOLIST:
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: TASKS_ACTIONS_TYPE.REMOVE_TASK,
        taskId,
        todolistId,
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: TASKS_ACTIONS_TYPE.ADD_TASK,
        title,
        todolistId,
        taskId: v1(),
    }
}

export const changeTaskStatusAC = (taskId: string, status: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: TASKS_ACTIONS_TYPE.CHANGE_TASK_STATUS,
        taskId,
        status,
        todolistId,
    }
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {
        type: TASKS_ACTIONS_TYPE.CHANGE_TASK_TITLE,
        todolistId,
        taskId,
        title,
    }
}




