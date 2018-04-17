import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const Pusher: any;

const environment: any = {
  key: '770db046aaf722db5c26',
  config: {
    cluster: 'us2',
    encrypted: true
  }
}

@Injectable()
export class PusherService {

  private pusher: any;

  constructor(
    private http: HttpClient
  ) {
    this.pusher = new Pusher(environment.key, environment.config);

    /*
    let test = this.pusher.subscribe('cliente');
    */
  }

  public getPusher(): any {
    return this.pusher;
  }

}
