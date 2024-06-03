import { ToDoListFormData } from "../components/AddTaskForm/schema";
import { TodoItemResponse } from "./api-responses.interface";
const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;
export const getAllToDoListItems = async (): Promise<TodoItemResponse[]> => {
  const response = await fetch(baseUrl + "/todolist");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await response.json();
  return data;
};

export const getToDoListItemById = async (
  id: number
): Promise<TodoItemResponse> => {
  const response = await fetch(`${baseUrl}/todolist/${id}`);
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Failed to fetch item");
  }
  return await response.json();
};

export const createToDoListItem = async (
  data: ToDoListFormData
): Promise<TodoItemResponse> => {
  const response = await fetch(baseUrl + "/todolist", {
    method: "POST",
    body: JSON.stringify({ ...data, completed: false }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Error creating new task");
  }
  return await response.json();
};

export const updateToDoListItem = async (
  id: number,
  data: ToDoListFormData
): Promise<TodoItemResponse> => {
  const response = await fetch(`${baseUrl}/todolist/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Error updating task");
  }
  return await response.json();
};

export const deleteToDoListItem = async (id: number) => {
  const response = await fetch(`${baseUrl}/todolist/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Error deleting task");
  }
  return;
};
