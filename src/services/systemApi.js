import baseUrl from './baseUrl';

const { agentAddress } = baseUrl[process.env.BUILD_ENV];

export const GET_USER_INFO = `${agentAddress}/users/current/info`;

