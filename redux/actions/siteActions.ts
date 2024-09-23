import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../../config";

export interface CreateSitePayload {
  siteName: string;
  siteCode: string;
  address?: string;
  logo?: string;
  companyId: string;
  finishDate?: string;
}

interface UpdateSitePayload {
  siteId: string;
  siteName: string;
  siteCode: string;
  address: string;
  logo: string;
  finishDate: string;
}

export const createSite = createAsyncThunk(
  "site/create",
  async (payload: CreateSitePayload, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/site`, payload);
      return data.site;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSites = createAsyncThunk(
  "site/getAll",
  async (companyId: string, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/site/gets`, { companyId });
      return data.sites;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSite = createAsyncThunk(
  'site/get',
  async (siteId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/site/${siteId}`);
      return data.site;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateSite = createAsyncThunk(
  'site/update',
  async (payload: UpdateSitePayload, thunkAPI) => {
    try {
      const { data } = await axios.put(`${server}/site/${payload.siteId}`, payload);
      return data.site;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteSite = createAsyncThunk(
  'site/delete',
  async (siteId: string, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${server}/site/${siteId}`);
      return data.message; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);