import { createReducer } from "@reduxjs/toolkit";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../actions/projectActions";

export interface Project {
  _id: string;
  projectName: string;
  projectCode: string;
  address: string;
  logo: string;
}

 interface ProjectState {
  projects: Project[];
  project: Project | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: ProjectState = {
  projects: [],
  project: null, 
  loading: false,
  error: null,
  message: null,
};

export const projectReducer = createReducer(initialState, (builder) => {
  builder
    // Create Project
    .addCase(createProject.pending, (state) => {
      state.loading = true;
    })
    .addCase(createProject.fulfilled, (state, action) => {
      state.loading = false;
      state.project = action.payload;
    })
    .addCase(createProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    // Get Projects
    .addCase(getProjects.pending, (state) => {
      state.loading = true;
    })
    .addCase(getProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    })
    .addCase(getProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    // Get Project
    .addCase(getProject.pending, (state) => {
      state.loading = true;
    })
    .addCase(getProject.fulfilled, (state, action) => {
      state.loading = false;
      state.project = action.payload;
    })
    .addCase(getProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    // Update Project
    .addCase(updateProject.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateProject.fulfilled, (state, action) => {
      state.loading = false;
      state.project = action.payload;
    })
    .addCase(updateProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    // Delete Project
    .addCase(deleteProject.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteProject.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteProject.rejected, (state, action) => {
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