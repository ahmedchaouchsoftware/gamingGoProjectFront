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
    return this.http.get<Gamer>(AppSettings.APP_URL + "/gamers/list")
  }

  findGamerById(idGamer:Number){
    return this.http.get<Gamer>(AppSettings.APP_URL + "/gamers/" + idGamer)
  }

  saveGamer(gamer:Gamer){
    return this.http.post<Gamer>(AppSettings.APP_URL + "/gamers/add" , gamer)
  }

  loginGamer(mail:string, password:string){
    return this.http.post<Gamer>(AppSettings.APP_URL + "/gamers/login?mail="+ mail + "&password=" + password,null)
  }

}
