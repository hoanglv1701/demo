import { useNavigate } from 'react-router-dom';
import '../styles.less';
import { MenuProps } from '../types';
import { useAppSelector } from '@/hooks';
import { AUTH_MANAGER } from '@/store/config';
import { UserState } from '@/store/slices/auth';

const Menu: React.FC<MenuProps> = ({ onChangeMenu }) => {
  const userState = useAppSelector<UserState>((state) => state[AUTH_MANAGER]);
  const navigate = useNavigate();

  const dataMenu = userState?.config?.menuHeader;
  const handleClick = (item: any) => {
    onChangeMenu(item);
  };

  return (
    <>
      <nav className='menu'>
        <ul className='menu-list'>
          <li key={0} className='menu-item' onClick={() => navigate('/')}>
            <a className='menu-link'>Trang chủ</a>
          </li>
          {dataMenu &&
            dataMenu.map((item, key) => {
              return (
                <li key={key + 1} className='menu-item' onClick={() => handleClick(item)}>
                  <a className='menu-link'>{item.description}</a>
                </li>
              );
            })}
        </ul>
      </nav>
    </>
  );
};

export default Menu;
