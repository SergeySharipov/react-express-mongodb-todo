import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:4000"

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
            baseUrl + "/todos"
        )
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
    formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, "_id"> = {
            name: formData.name,
            description: formData.description,
            status: false,
        }
        const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + "/add-todo",
            todo
        )
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
    todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoUpdate: Pick<ITodo, "status"> = {
            status: true,
        }
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}/edit-todo/${todo._id}`,
            todoUpdate
        )
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
    _id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}/delete-todo/${_id}`
        )
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