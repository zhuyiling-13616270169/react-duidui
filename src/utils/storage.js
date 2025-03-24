// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// 创建本地缓存对象
const createStorage = ({ prefixKey = '', storage = localStorage } = {}) => {
    //  本地缓存类
    class Storage {
        constructor() {
            this.storage = storage;
            this.prefixKey = prefixKey;
        }

        getKey (key) {
            return `${this.prefixKey}_${key}`.toUpperCase();
        }

        // 设置缓存
        set (key, value, expire = DEFAULT_CACHE_TIME) {
            const stringData = JSON.stringify({
                value,
                expire: expire !== null ? new Date().getTime() + expire * 1000 : null
            });
            this.storage.setItem(this.getKey(key), stringData);
        }

        // 读取缓存
        get (key, def) {
            const item = this.storage.getItem(this.getKey(key));
            if (item) {
                try {
                    const data = JSON.parse(item);
                    const { value, expire } = data;
                    // 在有效期内直接返回
                    if (expire === null || expire >= Date.now()) {
                        return value;
                    }
                    this.remove(this.getKey(key));
                } catch (e) {
                    return def;
                }
            }
            return def;
        }

        // 从缓存删除某项
        remove (key) {
            this.storage.removeItem(this.getKey(key));
        }

        // 清空所有缓存
        clear () {
            this.storage.clear();
        }

        // 设置cookie
        setCookie (key, value, options) {
            window.Cookies.set(key, value, options);
        }

        // 根据名字获取cookie值
        getCookie (key) {
            return window.desktop?.[key] || window.Cookies.get(key);
        }

        // 根据名字删除指定的cookie
        removeCookie (key) {
            this.setCookie(key, 1, -1);
        }

        // 清空cookie，使所有cookie失效
        clearCookie () {
            const keys = document.cookie.match(/[^ =;]+(?==)/g);
            if (keys) {
                for (let i = keys.length; i--;) {
                    if (process.env.BUILD_ENV == 'local') {
                        window.Cookies.remove(keys[i], { domain: 'localhost' });
                    }
                }
            }
        }
    }
    return new Storage();
};

export const storage = createStorage({
    prefixKey: 'UNDRUK-WEB'
});
