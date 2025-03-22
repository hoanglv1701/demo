import React, { Suspense, createElement, useEffect, useMemo, useRef } from 'react';
import { Layout } from 'antd';
import {
  Outlet,
  Route,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate
} from 'react-router-dom';
import Breadcumbs from './Breadcumbs';
import Footer from './Footer';
import Headers from './Header';
import { HeaderRef } from './Header/types';
import SiderBar from './SiderBar';
import { MenuItem, SideBarRef } from './SiderBar/types';
import LoadComponentFallback from '@/components/Atoms/LoadComponentFallback';
import { LOCAL_STORAGE } from '@/constants/common';
import { CollapsedStatusEnums } from '@/constants/enums';
import { useAppDispatch } from '@/hooks';
import useAccountLogin from '@/hooks/useAccountLogin';
// import PhanCongHoSo from '@/pages/PhanCongHoSo';
import NotFound from '@/pages/404';
import App from '@/pages/App';
import { bottomMenu } from '@/routes';
import { setUserConfig } from '@/store/slices/auth';
import { findFirstMenu } from '@/utilities/common';
import MapComponent from '@/pages/Map';

const contextPath = import.meta.env.VITE_CONTEXT_PATH || '/';
// Định nghĩa kiểu dữ liệu cho tham số children là ReactNode
const { Content } = Layout;
const PageLayout = () => {
  const dispatch = useAppDispatch();
  const sideBarRef = useRef<SideBarRef>(null);
  const headerRef = useRef<HeaderRef>(null);
  const user = useAccountLogin();
  const navigate = useNavigate();
  const activeMenu = localStorage.getItem('activeMenu') || '';
  useEffect(() => {
    dispatch(
      setUserConfig({
        config: {
          ...user.config,
          menuUser: user.config?.menuSidebar[activeMenu] || []
        }
      })
    );
  }, [activeMenu, user.config?.menuSidebar]);

  // Điều hướng đến trang hiện tại khi F5
  useEffect(() => {
    navigate(window.location.pathname);
  }, [navigate]);
  const mainMenu = useMemo(() => {
    return user.currentMenu || user.config?.menuSidebar[activeMenu];
  }, [user.currentNhomQuyen, user.currentMenu, activeMenu, user.config?.menuSidebar]);

  useEffect(() => {
    const localStorageCollapseValue = localStorage.getItem(LOCAL_STORAGE.COLLAPSED_MENU);
    const convertedCollapseValueToBool = Boolean(localStorageCollapseValue && JSON.parse(localStorageCollapseValue));
    handleChangeCollapse(convertedCollapseValueToBool);
  }, []);

  function handleChangeCollapse(newState: boolean) {
    sideBarRef.current?.updateCollapse(newState);
    headerRef.current?.updateCollapse(newState);

    const newLocalStorageCollapseValue = (
      newState ? CollapsedStatusEnums.Collapsed : CollapsedStatusEnums.Expanded
    ).toString();
    localStorage.setItem(LOCAL_STORAGE.COLLAPSED_MENU, newLocalStorageCollapseValue);
  }

  function onChangeMenu(item: any) {
    const newMenu = user.config?.menuSidebar[item?.name];
    const finUrlMenu = findFirstMenu(newMenu);
    navigate(finUrlMenu.url);
    localStorage.setItem('activeMenu', item.name);
    dispatch(
      setUserConfig({
        config: {
          ...user.config,
          menuUser: newMenu || []
        }
      })
    );
  }

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Headers ref={headerRef} onChange={handleChangeCollapse} onChangeMenu={onChangeMenu} />
        <Layout>
          <SiderBar ref={sideBarRef} mainMenu={mainMenu} bottomMenu={bottomMenu} />
          <Layout>
            <Breadcumbs />
            <Content className='m-0 p-0 rounded-none'>
              <Outlet />
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};
const switchRoutes = (routes: MenuItem[]) =>
  createRoutesFromElements(
    <Route>
      <Route element={<PageLayout />}>
        {routes.map((prop: MenuItem, key: number) => {
          return (
            <Route
              path={`${prop.key}`}
              key={key}
              errorElement={<NotFound />}
              element={
                prop.component && (
                  <Suspense fallback={<LoadComponentFallback />}>{createElement(prop.component)}</Suspense>
                )
              }
            ></Route>
          );
        })}
        {handleGenerateRouterRecursive(routes)}
        <Route path='*' element={<NotFound notFound />} />
      </Route>
      <Route
        path='/logout'
        element={
          <Suspense fallback={<LoadComponentFallback />}>
            <MapComponent />
          </Suspense>
        }
        errorElement={<NotFound />}
      />
      <Route
        path='/'
        element={
          <Suspense fallback={<LoadComponentFallback />}>
            <MapComponent />
          </Suspense>
        }
        errorElement={<NotFound />}
      />
    </Route>
  );

function handleGenerateRouterRecursive(routes: MenuItem[]): any {
  const finalRouters: RouteObject[] = [];
  const mapRouter = (routes: any) => {
    routes.forEach((prop: MenuItem, key: number) => {
      if (prop.children) {
        mapRouter(prop.children);
      } else {
        finalRouters.push(
          (
            <Route
              path={`${prop.key?.substring(0, prop.key?.includes('?') ? prop.key?.indexOf('?') : prop.key.length)}`}
              key={key}
              errorElement={<NotFound />}
              element={
                prop.component && (
                  <Suspense fallback={<LoadComponentFallback />}>{createElement(prop.component)}</Suspense>
                )
              }
            />
          ) as RouteObject
        );
      }
    });
  };
  mapRouter(routes);
  return finalRouters;
}
const AuthLayout: React.FC = () => {
  //TODO: logic dynamic router here
  const user = useAccountLogin();
  const router = useMemo(() => {
    return createBrowserRouter(switchRoutes([...user.currentMenu, ...bottomMenu]), {
      basename: `${contextPath}`
    });
  }, [user.currentMenu, bottomMenu, contextPath]);
  return <RouterProvider router={router} />;
};

export default AuthLayout;
