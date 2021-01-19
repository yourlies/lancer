export interface Issue {
  title: 'todoItem';
  body: string;
}
export type IssuesResponse = [Issue] | [];
type AuthToken = {
  TodoToken: string;
};

import { TypeStorage } from '../../mock';
import Axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
const storage = new TypeStorage<AuthToken>();
const token = storage.selectItem('TodoToken');

const axios = Axios.create({
  baseURL: 'https://api.github.com/repos/yourlies/todolist-issues',
  timeout: 6000,
  headers: {
    Authorization: `token ${token}`,
  },
});
export const request = function (config: AxiosRequestConfig): AxiosPromise<IssuesResponse> {
  return axios(config);
};
