import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { LOADING_MANAGER } from '../config';

export interface LoadingState {
  loading: boolean;
  loadingChuyenDoi: boolean;
  loadingAutoConfirm: string;
  authLoading: boolean;
}

const initialState: LoadingState = {
  loading: false,
  loadingChuyenDoi: false,
  loadingAutoConfirm: '',
  authLoading: false
};

export const loadingSlice = createSlice({
  name: LOADING_MANAGER,
  initialState: initialState,
  reducers: {
    startLoading(state) {
      if (state.loadingChuyenDoi || state.loadingAutoConfirm) {
        state.loading = false;
        return;
      }
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    startLoadingChuyenDoi(state) {
      if (state.loadingAutoConfirm) {
        state.loadingChuyenDoi = false;
        return;
      }
      state.loadingChuyenDoi = true;
    },
    stopLoadingChuyenDoi(state) {
      state.loadingChuyenDoi = false;
    },
    startLoadingAutoConfirm(state, { payload }) {
      state.loadingAutoConfirm = payload;
    },
    stopLoadingAutoConfirm(state) {
      state.loadingAutoConfirm = '';
    },
    startAuthLoading(state) {
      state.authLoading = true;
    },
    stopAuthLoading(state) {
      state.authLoading = false;
    }
  }
});

export const loadingStore = (state: RootState) => state[LOADING_MANAGER];
export const {
  startLoading,
  stopLoading,
  startLoadingChuyenDoi,
  stopLoadingChuyenDoi,
  startAuthLoading,
  stopAuthLoading,
  startLoadingAutoConfirm,
  stopLoadingAutoConfirm
} = loadingSlice.actions;
export default loadingSlice.reducer;
