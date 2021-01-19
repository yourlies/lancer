import { request } from './lib';

export const getIssues = async function () {
  return request({
    url: '/issues',
    method: 'get',
  });
};
/**
 *
 * @param issue 传入的issue对象，将自动被转化成json
 */
export const createIssue = function (issue: InsetItem) {
  return request({
    url: '/issues',
    method: 'post',
    data: {
      title: 'todoItem',
      body: JSON.stringify(issue),
    },
  });
};
