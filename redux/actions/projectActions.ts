import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../../config";

export interface CreateProjectPayload {
  projectName: string;
  projectCode: string;
  logo?: string; 
  companyId: string;
}

interface UpdateProjectPayload {
  projectId: string;
  projectName: string;
  projectCode: string;
  address: string;
  logo: string;
}

export const createProject = createAsyncThunk(
  "project/create",
  async (payload: CreateProjectPayload, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/project`, payload);
      return data.project;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getProjects = createAsyncThunk(
  "project/getAll",
  async (companyId: string, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/project/gets`, { companyId });
      return data.projects;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getProject = createAsyncThunk(
  'project/get',
  async (projectId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/project/${projectId}`);
      return data.project;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'project/update',
  async (payload: UpdateProjectPayload, thunkAPI) => {
    try {
      const { data } = await axios.put(`${server}/project/${payload.projectId}`, payload);
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'project/delete',
  async (projectId: string, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${server}/project/${projectId}`);
      return data.message; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);