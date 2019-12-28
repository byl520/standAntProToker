import RSAKey from '../utils/rsa';
import { b64tohex, hex2b64 } from '../utils/base64';
import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
  exponent: string;
  modulus: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  console.log(params);
  let { password, username, exponent, modulus } = params;

  return request(`/api/member/adminLogin?username=${username}&password=${password}`, {
    headers: {
      Accept: '*/*',
    },
    method: 'POST',
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function getLoginMsg(mobile: string) {
  return request(`/api/common/getPublicKey`);
}
