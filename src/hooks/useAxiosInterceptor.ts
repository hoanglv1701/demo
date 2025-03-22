import { useAppDispatch } from './useAppDispatch';
import { webHttpLoading } from '@/service';
import { startLoading, stopLoading } from '@/store/slices/loading';

export const useAxiosInterceptor = () => {
  const dispatch = useAppDispatch();

  webHttpLoading.getInstance().interceptors.request.use(
    (req) => {
      dispatch(startLoading());
      return req;
    },
    (error) => {
      dispatch(stopLoading());
      return Promise.reject(error);
    }
  );
  webHttpLoading.getInstance().interceptors.response.use(
    (res) => {
      dispatch(stopLoading());
      return res;
    },
    (error) => {
      dispatch(stopLoading());
      return Promise.reject(error);
    }
  );
};
