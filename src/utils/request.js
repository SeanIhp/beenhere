import wx from 'labrador';
import request from 'al-request';
import { getState } from '../app/dva-util';

function urlProxy(url) 
{
  if (!url.startsWith('/')) return url;
  else {
    return request.getOptions().apiRoot + url;
  }  
}

function checkStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  }

  const error = new Error(response.statusText || response.data);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  const resp = response.data;
  //console.log(resp);
  return resp;
}

export default function xFetch(url, options) {
  return new Promise((resolve, reject) => {
    let method = "GET";
    if (options.method) method = options.method.toUpperCase();
    let data = options['body']?options['body']:options['data'];
    let header = options['headers'];
    url = buildRequestUrl(url);
    url = urlProxy(url);

    wx.request({
      method,
      url,
      data,
      header
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => 
    {
      if (response.returncode === undefined) resolve({ body: response });
      else {
        if (response.returncode === '0') resolve({ body: response });
        else throw new Error(response.data);
      }
    })
    .catch((error) => 
    { 
      reject(error); 
    });
  })
}

export function buildRequestUrl(url) {
  let loginInfo = getState('loginInfo');
  var Referrer = getState('Referrer');
  let state = null;
  let entid = null;
  if (Referrer['query'] && Referrer['query']['ent_id']) entid = Referrer.query.ent_id;
  if (Referrer['query'] && Referrer['query']['state']) state = Referrer.query.state;
  if (loginInfo.openid || entid) {
    url = url + (url.indexOf('?')<0?'?':'&') + 'ent_id=' + (loginInfo.openid?loginInfo.entid:entid);
  }
  if (state && url.indexOf('/omw-service-') >= 0) {
    url = url + (url.indexOf('?')<0?'?':'&') + 'state=' + state;
  }

  return url;
}