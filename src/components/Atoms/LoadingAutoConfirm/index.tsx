import { memo } from 'react';
import { Spin } from 'antd';
import '@/assets/style/loadingInitField.css';

const LoadingAutoConfirm = memo(function LoadingAutoConfirm({ loading }: { loading: string }) {
  return (
    <>
      {loading && (
        <div className='loading-chuyen-doi-container'>
          <Spin
            tip={
              <>
                <div className='flex justify-center items-center mt-1'>
                  <p style={{ color: 'white', fontSize: 16, margin: 0, textShadow: 'none' }}>
                    Đang chuyển đổi tài liệu và tải bản xem trước
                  </p>
                  <div className='loading-dots ml-1'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                  </div>
                </div>

                <div className='flex justify-center'>
                  <p
                    style={{
                      color: 'white',
                      fontSize: 14,
                      margin: 0,
                      textShadow: 'none',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      maxWidth: 350
                    }}
                  >
                    {loading}
                  </p>
                </div>
              </>
            }
            spinning={!!loading}
            style={{ zIndex: 3003 }}
            size='large'
          >
            <div className='loading-chuyen-doi' style={{ width: 400, height: 150, marginTop: 30 }}></div>
          </Spin>
        </div>
      )}
    </>
  );
});

export default LoadingAutoConfirm;
