import axios, { AxiosResponse } from "axios"
import authHeader from "./auth-header";

const baseUrl: string = "http://localhost:8080"

export const getTodos = async (
    currentUserId: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
            `${baseUrl}/${currentUserId}/todos`, { headers: authHeader() });
        return todos
    } catch (e) {
        if (e instanceof TypeError) {
            throw e
        } else if (typeof e === "string" || typeof e === "undefined") {
            throw new Error(e)
        } else {
            throw new Error("Error: getTodos()")
        }
    }
}

export const addTodo = async (
    currentUserId: string,
    formData: ITodo
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
        if (e instanceof TypeError) {
            throw e
        } else if (typeof e === "string" || typeof e === "undefined") {
            throw new Error(e)
        } else {
            throw new Error("Error: addTodo()")
        }
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
        if (e instanceof TypeError) {
            throw e
        } else if (typeof e === "string" || typeof e === "undefined") {
            throw new Error(e)
        } else {
            throw new Error("Error: updateTodo()")
        }
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
        if (e instanceof TypeError) {
            throw e
        } else if (typeof e === "string" || typeof e === "undefined") {
            throw new Error(e)
        } else {
            throw new Error("Error: deleteTodo()")
        }
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
        if (e instanceof TypeError) {
            throw e
        } else if (typeof e === "string" || typeof e === "undefined") {
            throw new Error(e)
        } else {
            throw new Error("Error: deleteTodo()")
        }
    }
}