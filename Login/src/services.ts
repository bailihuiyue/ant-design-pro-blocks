import request from '@/utils/request';

export async function FElogin(params:any): Promise<any> {
  return request('/auth/v1/login', {
    method: 'POST',
    body: params,
  });
}
