import { useEffect, useState } from 'react';
import { Spin } from 'antd';

function LoadingChuyenDoi({ loading }: { loading: boolean }) {
  const [dots, setDots] = useState('...');

  useEffect(() => {
    setDots('...');
  }, [loading]);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length === 8) {
          return '...';
        } else {
          return prev + '.';
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [loading]);
  return (
    <>
      {loading && (
        <div className='loading-chuyen-doi-container'>
          <Spin
            tip={
              <p style={{ color: 'white', fontSize: 16, margin: 0, textShadow: 'none' }}>
                Đang chuyển đổi tài liệu{' '}
                <span style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 3, textShadow: 'none' }}>{dots}</span>
              </p>
            }
            spinning={loading}
            style={{ zIndex: 3002 }}
            size='large'
          >
            <div className='loading-chuyen-doi'></div>
          </Spin>
        </div>
      )}
    </>
  );
}

export default LoadingChuyenDoi;
