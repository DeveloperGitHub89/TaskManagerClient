import axios from 'axios';
import { TASK_URL_PREFIX } from '../constants/ApiServiceConstants';

export function saveTask(task){
    return axios.post(TASK_URL_PREFIX,task);
}

export function getTasksFromServer(url){
    return axios.get(`${TASK_URL_PREFIX}/${url}`);
}


export function deleteTask(taskId){
    return axios.delete(`${TASK_URL_PREFIX}/${taskId}`);
}

export function markTaskAsCompleted(taskId){
    return axios.put(`${TASK_URL_PREFIX}/${taskId}/mark-completed`);
}