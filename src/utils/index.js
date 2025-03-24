import { notification } from 'antd';
import { storage } from './storage';

export function openNotificationWithIcon (type, message, description) {
    notification.destroy();
    notification[type]({
        message: message,
        description: description,
    });
}

export function uniqueArray (arr, key) {
    let newArr = [];
    let obj = {};

    for (let i = arr.length - 1; i >= 0; i--) {
        if (!obj[arr[i][key]]) {
            newArr.push(arr[i]);
            obj[arr[i][key]] = true;
        }
    }

    return newArr.reverse();
}

export async function downloadFile (filePath, fileName) {
    // const ext = filePath.substring(filePath.lastIndexOf('.') + 1);
    // await axios.downloadForStream({ url: filePath, filename: `${fileName}${dayjs().format('YYYY-MM-DDHH-mm-ss')}.${ext}` });

    // const ext = filePath.substring(filePath.lastIndexOf('.') + 1);
    // const result = await axios.get(filePath, { responseType: 'blob' });
    // console.log(result)
    // const url = window.URL.createObjectURL(result.data);
    // const a = document.createElement('a');
    // a.download = `${fileName}${dayjs().format('YYYY-MM-DDHH-mm-ss')}.${ext}`;
    // a.href = url;
    // a.click();
}

export function logout () {
    storage.clear();
    storage.clearCookie();
    const loginUrl = {
        'local': 'http://localhost:5555/',
    }[process.env.BUILD_ENV];
    window.location.replace(loginUrl);
}

// 防抖
export function throttle (fn, delay) {
    let timer = null;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}

export function guid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
