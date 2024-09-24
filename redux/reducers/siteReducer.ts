import { createReducer } from "@reduxjs/toolkit";
import {
  createSite,
  getSite,
  getSites,
  updateSite,
  deleteSite,
} from "../actions/siteActions";

export interface Site {
  _id: string;
  siteName: string;
  siteCode: string;
  address: string;
  logo: string;
  finishDate: string;
  companyId: string;
  createdAt: string;
  status: string;
}

interface SiteState {
  sites: Site[];
  site: Site | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: SiteState = {
  sites: [],
  site: null,
  loading: false,
  error: null,
  message: null,
};

export const siteReducer = createReducer(initialState, (builder) => {
  builder
    // Create Site
    .addCase(createSite.pending, (state) => {
      state.loading = true;
    })
    .addCase(createSite.fulfilled, (state, action) => {
      state.loading = false;
      state.site = action.payload;
    })
    .addCase(createSite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    // Get Sites
    .addCase(getSites.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSites.fulfilled, (state, action) => {
      state.loading = false;
      state.sites = action.payload;
    })
    .addCase(getSites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    // Get Site
    .addCase(getSite.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSite.fulfilled, (state, action) => {
      state.loading = false;
      state.site = action.payload;
    })
    .addCase(getSite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    // Update Site
    .addCase(updateSite.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateSite.fulfilled, (state, action) => {
      state.loading = false;
      state.site = action.payload;
    })
    .addCase(updateSite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    // Delete Site
    .addCase(deleteSite.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteSite.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteSite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    // Clear Error and Message
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
    });
});