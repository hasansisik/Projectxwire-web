import { createReducer } from "@reduxjs/toolkit";
import {
  createForm,
  getForms,
  getForm,
  updateForm,
  deleteForm,
} from "../actions/formActions";

interface FormState {
  forms: any[];
  form: any;
  loading: boolean;
  error: string | null;
}

const initialState: FormState = {
  forms: [],
  form: {},
  loading: false,
  error: null,
};

export const formReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createForm.pending, (state) => {
      state.loading = true;
    })
    .addCase(createForm.fulfilled, (state, action) => {
      state.loading = false;
      state.forms.push(action.payload);
    })
    .addCase(createForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(getForms.pending, (state) => {
      state.loading = true;
    })
    .addCase(getForms.fulfilled, (state, action) => {
      state.loading = false;
      state.forms = action.payload;
    })
    .addCase(getForms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(getForm.pending, (state) => {
      state.loading = true;
    })
    .addCase(getForm.fulfilled, (state, action) => {
      state.loading = false;
      state.form = action.payload;
    })
    .addCase(getForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(updateForm.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateForm.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.forms.findIndex(
        (form) => form._id === action.payload._id
      );
      if (index !== -1) {
        state.forms[index] = action.payload;
      }
    })
    .addCase(updateForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(deleteForm.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteForm.fulfilled, (state, action) => {
      state.loading = false;
      state.forms = state.forms.filter(
        (form) => form._id !== action.payload._id
      );
    })
    .addCase(deleteForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});
