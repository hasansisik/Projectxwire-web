import { createReducer } from "@reduxjs/toolkit";
import {
  createPlan,
  getPlans,
  getPlan,
  updatePlan,
  deletePlan,
  createPin,
  getPins,
} from "../actions/planActions";

interface PlanState {
  plans: any[];
  plan: any;
  pins: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PlanState = {
  plans: [],
  plan: {},
  pins: [],
  loading: false,
  error: null,
};

export const planReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createPlan.pending, (state) => {
      state.loading = true;
    })
    .addCase(createPlan.fulfilled, (state, action) => {
      state.loading = false;
      state.plans.push(action.payload);
    })
    .addCase(createPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
    })
    .addCase(getPlans.pending, (state) => {
      state.loading = true;
    })
    .addCase(getPlans.fulfilled, (state, action) => {
      state.loading = false;
      state.plans = action.payload;
    })
    .addCase(getPlans.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
    })
    .addCase(getPlan.pending, (state) => {
      state.loading = true;
    })
    .addCase(getPlan.fulfilled, (state, action) => {
      state.loading = false;
      state.plan = action.payload;
    })
    .addCase(getPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
    })
    .addCase(updatePlan.pending, (state) => {
      state.loading = true;
    })
    .addCase(updatePlan.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.plans.findIndex(
        (plan) => plan._id === action.payload._id
      );
      if (index !== -1) {
        state.plans[index] = action.payload;
      }
    })
    .addCase(updatePlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
    })
    .addCase(deletePlan.pending, (state) => {
      state.loading = true;
    })
    .addCase(deletePlan.fulfilled, (state, action) => {
      state.loading = false;
      state.plans = state.plans.filter((plan) => plan._id !== action.payload);
    })
    .addCase(deletePlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
    })
    .addCase(createPin.pending, (state) => {
      state.loading = true;
    })
    .addCase(createPin.fulfilled, (state, action) => {
      state.loading = false;
      state.pins.push(action.payload);
    })
    .addCase(createPin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
    })
    .addCase(getPins.pending, (state) => {
      state.loading = true;
    })
    .addCase(getPins.fulfilled, (state, action) => {
      state.loading = false;
      state.pins = action.payload;
    })
    .addCase(getPins.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
    });
});
