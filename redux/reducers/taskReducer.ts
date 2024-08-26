import { createReducer } from "@reduxjs/toolkit";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  addMessageToTask,
  getTaskMessages,
  getFiles,
  addPersonToTask,
} from "../actions/taskActions";

interface TaskState {
  tasks: any[];
  task: any;
  messages: any[];
  files: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  task: {},
  messages: [],
  files: [],
  loading: false,
  error: null,
};

export const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTask.pending, (state) => {
      state.loading = true;
    })
    .addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
    })
    .addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(getTasks.pending, (state) => {
      state.loading = true;
    })
    .addCase(getTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    })
    .addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(getTask.pending, (state) => {
      state.loading = true;
    })
    .addCase(getTask.fulfilled, (state, action) => {
      state.loading = false;
      state.task = action.payload;
    })
    .addCase(getTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(updateTask.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateTask.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    })
    .addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(deleteTask.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload._id
      );
    })
    .addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(addMessageToTask.pending, (state) => {
      state.loading = true;
    })
    .addCase(addMessageToTask.fulfilled, (state, action) => {
      state.loading = false;
      state.messages.push(action.payload);
      if (action.payload.files && action.payload.files.length > 0) {
        state.files.push(...action.payload.files);
      }
    })
    .addCase(addMessageToTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(getTaskMessages.pending, (state) => {
      state.loading = true;
    })
    .addCase(getTaskMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.messages = action.payload;
      if (action.payload.files && action.payload.files.length > 0) {
        state.files = action.payload.files;
      }
    })
    .addCase(getTaskMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(getFiles.pending, (state) => {
      state.loading = true;
    })
    .addCase(getFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.files = action.payload;
    })
    .addCase(getFiles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(addPersonToTask.pending, (state) => {
      state.loading = true;
    })
    .addCase(addPersonToTask.fulfilled, (state, action) => {
      state.loading = false;
      const task = state.tasks.find(
        (task) => task._id === action.payload.taskId
      );
      if (task) {
        task.persons.push(action.payload.userId);
      }
    })
    .addCase(addPersonToTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});
