import request from '../utils/request';
// import { SERVICE_WXPROXY,SERVICE_TENANT } from '../constants';

export async function getopenid(reqdata) {
  // return request(SERVICE_WXPROXY + '/userinfo',{
  //   method: 'post',
  //   body: JSON.stringify(reqdata)
  // });
}

export async function auth(reqdata) {
  // return request(SERVICE_TENANT + '/rest?method=efuture.omp.identity.auth',{
  //   method: 'post',
  //   body: JSON.stringify(reqdata)
  // });
}

export async function login(reqdata) {
  // return request(SERVICE_TENANT + '/rest?method=efuture.omp.identity.bind',{
  //   method: 'post',
  //   body: JSON.stringify(reqdata)
  // });
}

export async function logout(reqdata) {
  // return request(SERVICE_TENANT + '/rest?method=efuture.omp.identity.disbind',{
  //   method: 'post',
  //   body: JSON.stringify(reqdata)
  // });
}
