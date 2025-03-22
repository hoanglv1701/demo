import { combineReducers } from '@reduxjs/toolkit';
import { AUTH_MANAGER, DANH_MUC_MANAGER, DIRTY_MANAGER, LOADING_MANAGER } from './config';
import authReducer from './slices/auth';
import danhMucReducer from './slices/danhMuc';
import dirtyReducer from './slices/dirty';
import loadingReducer from './slices/loading';

const rootReducer = combineReducers({
  [AUTH_MANAGER]: authReducer,
  [LOADING_MANAGER]: loadingReducer,
  [DANH_MUC_MANAGER]: danhMucReducer,
  [DIRTY_MANAGER]: dirtyReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
