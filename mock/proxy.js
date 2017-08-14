'use strict';

module.exports = {
  // proxy http://ip:port/xxx-path/*  
  'POST /omw-service-wxproxy/*'  : 'http://172.17.13.70:80',
  'POST /omp-webtenant-webin/*'  : 'http://172.17.11.96:80',
  'POST /omp-activity-webin/*'   : 'http://172.17.11.96:80',
  'POST /omc-accnt-webin/*'      : 'http://172.17.11.96:80',

  // proxy json-sever
  /* 模拟数据 */
  'GET /mock/*'                  : "http://localhost:4000",
};
