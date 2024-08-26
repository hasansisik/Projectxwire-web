import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../config";

export interface CreateTaskPayload {
  projectId: string;
  taskCreator: any;
  taskTitle: string;
  taskCategory: string;
  plan?: any; // plan özelliğini isteğe bağlı hale getiriyoruz
  persons: any;
}

interface UpdateTaskPayload {
  taskId: string;
  taskCategory: string;
  taskTitle: string;
  persons: string[];
  plans: string[];
}

export interface AddMessagePayload {
  taskId: string;
  content: string;
  senderId: string;
  files: string[];
}

interface AddPersonPayload {
  taskId: string;
  userId: string;
}

export const createTask = createAsyncThunk(
  "task/create",
  async (
    {
      projectId,
      taskCategory,
      taskTitle,
      persons,
      plan,
      taskCreator,
    }: CreateTaskPayload,
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${server}/task/${projectId}`, {
        taskCategory,
        taskTitle,
        persons,
        plan,
        taskCreator,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getTasks = createAsyncThunk(
  "task/getAll",
  async (projectId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/task/${projectId}`);
      return data.tasks;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getTask = createAsyncThunk(
  "task/get",
  async (taskId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/task/single/${taskId}`);
      return data.task;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/update",
  async (
    { taskId, taskCategory, taskTitle, persons, plans }: UpdateTaskPayload,
    thunkAPI
  ) => {
    try {
      const { data } = await axios.put(`${server}/task/${taskId}`, {
        taskCategory,
        taskTitle,
        persons,
        plans,
      });
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (taskId: string, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${server}/task/single/${taskId}`);
      return data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addMessageToTask = createAsyncThunk(
  "task/addMessage",
  async ({ taskId, content, senderId, files }: AddMessagePayload, thunkAPI) => {
    try {
      const response = await axios.post(`${server}/task/${taskId}/messages`, {
        content,
        senderId,
        files,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getTaskMessages = createAsyncThunk(
  "task/getMessages",
  async (taskId: string, thunkAPI) => {
    try {
      const response = await axios.get(`${server}/task/${taskId}/messages`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getFiles = createAsyncThunk(
  "task/getFiles",
  async (projectId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${server}/task/projects/${projectId}/files`
      );
      return data.files;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addPersonToTask = createAsyncThunk(
  "task/addPerson",
  async ({ taskId, userId }: AddPersonPayload, thunkAPI) => {
    try {
      const response = await axios.post(`${server}/task/single/${taskId}`, {
        userId,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
