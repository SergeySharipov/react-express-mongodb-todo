import axios, { AxiosResponse, AxiosError } from "axios"
import authHeader from "./auth-header";
import * as AuthService from "./auth.service";

const production = 'https://react-todo-list-js.herokuapp.com';
const development = 'http://localhost:8080';
const baseUrl = process.env.NODE_ENV === "production" ? production : development;

const logOut = () => {
    AuthService.logout();
    window.location.reload();
};

const catchUnauthorizedError = (e: unknown) => {
    if ((e as AxiosError).response) {
        if ((e as AxiosError).response?.status === 401) {
            alert("Session token expired. Please log in.")
            logOut()
        }
    }
};

export const getTodos = async (
    currentUserId: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
            `${baseUrl}/${currentUserId}/todos`, { headers: authHeader() });
        return todos
    } catch (e) {
        catchUnauthorizedError(e)
        throw e
    }
}

export const addTodo = async (
    currentUserId: string,
    formData: AddTodoFormData
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, "_id"> = {
            name: formData.name,
            description: formData.description,
            status: false,
            creator: currentUserId
        }
        const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
            `${baseUrl}/${currentUserId}/add-todo`,
            todo
            , { headers: authHeader() });
        return saveTodo
    } catch (e) {
        catchUnauthorizedError(e)
        throw e
    }
}

export const updateTodo = async (
    currentUserId: string,
    todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}/${currentUserId}/edit-todo/${todo._id}`,
            todo
            , { headers: authHeader() });
        return updatedTodo
    } catch (e) {
        catchUnauthorizedError(e)
        throw e
    }
}

export const deleteTodo = async (
    currentUserId: string,
    _id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}/${currentUserId}/delete-todo/${_id}`
            , { headers: authHeader() });
        return deletedTodo
    } catch (e) {
        catchUnauthorizedError(e)
        throw e
    }
}

export const deleteAllTodos = async (
    currentUserId: string,
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}/${currentUserId}/delete-all-todos/`
            , { headers: authHeader() });
        return deletedTodo
    } catch (e) {
        catchUnauthorizedError(e)
        throw e
    }
}