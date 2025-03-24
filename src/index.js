import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Provider } from 'react-redux';
import { AliveScope } from 'react-activation';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/zh-cn';
import store from '@/store';
import App from '@/router';
import './index.less';

dayjs.extend(isoWeek);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider
            locale={zhCN}
            theme={{
                token: {
                    // 主题配置不要看文档，需要看 ts 的 interface 文件
                    colorText: 'rgba(0,0,0,.65)',
                    colorPrimary: '#1890ff',
                    borderRadius: 2,
                },
            }}
        >
            <AliveScope>
                <Provider store={store}>
                    <App />
                </Provider>
            </AliveScope>
        </ConfigProvider>
)