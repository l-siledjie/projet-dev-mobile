import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
 providedIn: 'root'
})
export class GoogleDriveAuthService {
 private readonly credentialsUrl = 'assets/client_secret_830527196130-o2l1nkm93rlntmfnidvf0niv47qvh280.apps.googleusercontent.com.json';

 constructor(private http: HttpClient) {}

  getCredentials() {
    return this.http.get(this.credentialsUrl);
  }

  initializeGapi() {
    
  }


}
