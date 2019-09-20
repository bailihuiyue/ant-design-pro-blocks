import { parse } from 'qs';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(authority: string | string[]) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

export function setToken(authority: string) {
  return localStorage.setItem('fe-token', authority);
}

export function setUserInfo(userInfo: any): void {
  return localStorage.setItem('fe-userInfo', JSON.stringify(userInfo));
}