import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { Gamer } from 'src/app/models/gamer';

@Injectable({
  providedIn: 'root'
})
export class GamerService {

  constructor(private http: HttpClient) { }

  findAllGamers(){
    return this.http.get(AppSettings.APP_URL + "/gamers/list")
  }

  findGamerById(idGamer:Number){
    return this.http.get(AppSettings.APP_URL + "/gamers/" + idGamer)
  }

  saveGamer(gamer:Gamer){
    return this.http.post(AppSettings.APP_URL + "/gamers/add" , gamer)
  }

  login(mail:string, password:string){
    let param = new HttpParams();
    param.append("mail",mail)
    param.append("password",password)

    return this.http.post(AppSettings.APP_URL + "/gamers/login",param)
  }

}
