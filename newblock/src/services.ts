import request from '@/utils/request';

export async function Example(params:any): Promise<any> {
  return request('example', {
    method: 'POST',
    body: params,
  });
}
