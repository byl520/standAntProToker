import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  //后端已处理跨域问题
  return request('https://192.168.40.8:8443/toker/login?username=' + params.username + '&password=' + params.password, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    }
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
