import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../config";

export interface CreatePlanPayload {
  planImages: string;
  planName: string;
  planCode: string;
  planCategory: string;
  projectId: string;
}

interface UpdatePlanPayload {
  planId: string;
  planCategory: string;
  planCode: string;
  planName: string;
  planImages: string;
}

export const createPlan = createAsyncThunk(
  "plan/create",
  async (payload: CreatePlanPayload, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("planName", payload.planName);
      formData.append("planCode", payload.planCode);
      formData.append("planCategory", payload.planCategory);
      formData.append("projectId", payload.projectId);
      formData.append("planImages", payload.planImages);

      const { data } = await axios.post(
        `${server}/plan/${payload.projectId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data.plan;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPlans = createAsyncThunk(
  "plan/getAll",
  async (projectId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/plan/${projectId}`);
      return data.plans;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPlan = createAsyncThunk(
  "plan/get",
  async (planId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/plan/single/${planId}`);
      return data.plan;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePlan = createAsyncThunk(
  "plan/update",
  async (payload: UpdatePlanPayload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${server}/plan/${payload.planId}`,
        payload
      );
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deletePlan = createAsyncThunk(
  "plan/delete",
  async (planId: string, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${server}/plan/single/${planId}`);
      return data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export interface CreatePinPayload {
  planId: string;
  x: number;
  y: number;
  task: string;
}

export const createPin = createAsyncThunk(
  "plan/createPin",
  async (payload: CreatePinPayload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${server}/plan/pin/${payload.planId}`,
        payload
      );
      return data.pin;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPins = createAsyncThunk(
  "plan/getPins",
  async (planId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/plan/pin/${planId}`);
      return data.pins;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
