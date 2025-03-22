import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.less';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { AUTH_MANAGER } from '@/store/config';
import { UserState, setUserConfig } from '@/store/slices/auth';
import { findFirstMenu } from '@/utilities/common';

const App: React.FC = () => {
  // const [dataApp, setDataApp] = useState(listApp);
  const userState = useAppSelector<UserState>((state) => state[AUTH_MANAGER]);
  const dataMenu = userState?.config?.menuHeader;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectSoftware = (item: any) => {
    localStorage.setItem('activeMenu', item.name);
    const newMenu = userState.config?.menuSidebar[item?.name];
    dispatch(
      setUserConfig({
        config: {
          ...userState.config,
          menuUser: newMenu || []
        }
      })
    );
    navigate(findFirstMenu(newMenu).url);
  };

  return (
    <div>
      <div className='form-app h-[100vh] w-full flex items-center justify-center'>
        <div className='form-wapper items-center justify-center'>
          <label className='title-header'> PHẦN MỀM QUẢN LÝ KẾT CẤU HẠ TẦNG GIAO THÔNG ĐƯỜNG BỘ</label>
          <div className='form-item flex items-center justify-center'>
            {dataMenu &&
              dataMenu.map((item, index) => {
                return (
                  <div key={index}>
                    <div className='item-app' onClick={() => selectSoftware(item)}>
                      <a>
                        <img src={item.icon} className='logo_item' />
                      </a>
                    </div>
                    <label className='title'> {item.description}</label>
                  </div>
                );
              })}
          </div>
          {/* items-center justify-center */}
        </div>
      </div>
    </div>
  );
};

export default App;
