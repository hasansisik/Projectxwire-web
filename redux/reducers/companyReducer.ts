import { createReducer } from "@reduxjs/toolkit";
import { companyLogin, companyRegister } from "../actions/companyActions";

interface CompanyState {
  company: Record<string, any>;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  company: {},
  loading: false,
  error: null,
};

export const companyReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(companyRegister.pending, (state) => {
      state.loading = true;
    })
    .addCase(companyRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.company = action.payload;
    })
    .addCase(companyRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(companyLogin.pending, (state) => {
      state.loading = true;
    })
    .addCase(companyLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.company = action.payload;
    })
    .addCase(companyLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});