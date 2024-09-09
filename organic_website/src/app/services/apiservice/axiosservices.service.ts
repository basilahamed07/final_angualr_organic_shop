import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AxiosservicesService {

  private baseUrl: string = 'http://localhost:8000/api'; 
  constructor(private http: HttpClient) { }





  userLogin(userObj: any) {
    return this.http.post("http://172.17.7.104:8000/api/token/", userObj).pipe(
      
      map((resonse: any) => {
        console.log(resonse);
        if (resonse.access) {
          console.log(resonse);
          sessionStorage.setItem("access", resonse.access)
        }
        return resonse;
      })
    )
  }
  logOut() {
    sessionStorage.clear()
  }


}


