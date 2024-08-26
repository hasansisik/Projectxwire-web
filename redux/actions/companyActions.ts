import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../config";

interface RegisterPayload {
  CompanyCode: string;
  password: string;
  CompanyName: string;
  CompanyEmail: string;
  CompanyAddress: string;
  CompanyPhone: string;
}

export interface LoginPayload {
  CompanyCode: string;
  password: string;
}

export const companyRegister = createAsyncThunk(
  "company/register",
  async (payload: RegisterPayload, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/company/register`, payload);
      return data.company;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const companyLogin = createAsyncThunk(
  "company/login",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/company/login`, payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("companyId", data.company._id);
      }
      return data.company;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);