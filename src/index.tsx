import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { App as AntdApp, ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './store';

library.add(fas);
dayjs.extend(quarterOfYear).locale('vi');

const contextPath = import.meta.env.VITE_CONTEXT_PATH || '/';

const MainApp = () => {
  // useEffect(() => {
  //   if (window.location.pathname === '/') {
  //     window.location.replace(contextPath);
  //   }
  // }, [window.location.pathname]);

  return <App />;
};

window.addEventListener('vite:preloadError', async (event) => {
  event.preventDefault();
  if (localStorage.getItem('fetchFailed') !== '1') {
    localStorage.setItem('fetchFailed', '1');
    setTimeout(() => {
      window.location.reload();
    }, 200);
  } else {
    if (confirm('Kết nối máy chủ thất bại, vui lòng tải lại trang!')) {
      window.location.reload();
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        locale={viVN}
        theme={{
          token: {
            colorPrimary: '#2B5654',
            colorSuccess: '#52C41A',
            colorWarning: '#FAAD14',
            colorError: '#A9081C',
            colorInfo: '#2F49FF',
            colorLink: '#8A2BE2',
            colorBgLayout: '#E5E5E5',
            borderRadius: 5,
            fontSize: 14,
            fontFamily: 'Roboto, sans-serif',
            controlHeight: 32
          },
          components: {
            Menu: {
              darkItemBg: 'var(--gt-base-color)',
              darkPopupBg: 'var(--gt-base-color)',
              darkSubMenuItemBg: 'var(--gt-base-color)',
              darkItemColor: '#f7f7f7',
              darkItemSelectedBg: 'var(--gt-active-bg-color)',
              darkItemHoverColor: 'var(--gt-hover-text-color)',
              iconSize: 18,
              collapsedIconSize: 18
            },
            Layout: {
              siderBg: '#122827',
              motionDurationMid: '500ms'
            },
            Table: {
              borderColor: 'var(--gt-border-color)',
              headerBg: '#CBEACA',
              rowSelectedBg: 'rgb(219,235,221)',
              rowSelectedHoverBg: 'rgb(219,235,221)',
              headerColor: '#075843',
              headerBorderRadius: 0,
              cellPaddingBlockSM: 4,
              headerSortActiveBg: 'var(--gt-active-sort-bg-color)',
              headerSortHoverBg: undefined
            },
            Button: {
              borderRadius: 3,
              defaultShadow: 'none',
              primaryShadow: 'none',
              dangerShadow: 'none'
            },
            Descriptions: {
              titleMarginBottom: 4
            },
            Progress: {
              defaultColor: 'rgb(27, 82, 79)',
              colorSuccess: 'rgb(0, 164, 126)'
            }
          }
        }}
      >
        <AntdApp>
          <MainApp />
        </AntdApp>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);
