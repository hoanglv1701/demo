import { WebHttpBase } from '@/service';

export const APP_CODE = `${import.meta.env.VITE_APP_CODE}`;

export const Login = (req: any) => {
  return WebHttpBase.post<Service.Response<any>>(
    { url: '/api/auth/login', data: req },
    {
      errorMessageMode: 'none'
    }
  );
};

export const getUser = () => {
  return WebHttpBase.get<Service.Response<any>>(
    { url: '/api/user/currentUser' },
    {
      errorMessageMode: 'none'
    }
  );
};
