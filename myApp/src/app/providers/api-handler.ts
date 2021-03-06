import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiHandler {
  url: string = '';
  ENV: any;

  constructor(public http: HttpClient) {
    //Fetching the relevant environment file for interceptor and request header
    /* if (environment.production) {
            this.ENV = environment_prod;
        } else {
            this.ENV = environment;
        } */
    this.ENV = environment;
    this.url = this.ENV.baseUrl;
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    console.log('endpoint ', endpoint);
    console.log('params ', params);
    console.log('reqOpts ', reqOpts);

    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
      };
    }
    let reqParams = '';
    if (params !== undefined) {
      reqParams = reqParams + '?';
      console.log(params.params.length);

      if (params.params.length) {
        for (let i = 0; i < params.params.length; i++) {
          let key = params.params[i].key;
          let val = params.params[i].value;
          reqParams = reqParams + key + '=' + val;
          if (i != params.params.length - 1) {
            reqParams = reqParams + '&';
          }
        }
      } else {
        let key = params.params.key;
        let val = params.params.value;
        if (key != undefined && val != undefined)
          reqParams = reqParams + key + '=' + val;
      }

      endpoint = endpoint + reqParams;
      this.url = this.ENV.baseUrl;
    }
    console.log('reqparams ', reqParams);

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }
}
