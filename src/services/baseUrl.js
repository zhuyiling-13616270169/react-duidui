import { storage } from '@/utils/storage';

const region = storage.getCookie('region');
export default {
    'local': {
        // 'agentAddress': `http://devb-${region}-xxx.cn`,
        // 'publicAddress': `https://xxx.com`,
        // 'fileApiBaseUrl': `https://xxx.com`,
        'agentAddress': `https://${region}xxx.com`,
        'publicAddress': `https://xxx.com`,
        'fileApiBaseUrl': `https://xxx.com`,
    },
    'develop-a': {
        'agentAddress': `http://xxx.cn`,
        'publicAddress': `https://xxx.com`,
        'fileApiBaseUrl': `https://xxx.com`,
    },
    'release': {
        'agentAddress': `https://${region}xxx.com`,
        'publicAddress': `https://xxx.com`,
        'fileApiBaseUrl': `https://xxx.com`,
    },
    'prod': {
        'agentAddress': `https://${region}-xxx.com`,
        'publicAddress': `https://xxx.com`,
        'fileApiBaseUrl': `https://xxx.com`,
    }
}