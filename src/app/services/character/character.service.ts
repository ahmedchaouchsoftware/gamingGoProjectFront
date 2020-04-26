import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { GameCharacter } from 'src/app/models/gameCharacter';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  findAllCharacters(){
    return this.http.get(AppSettings.APP_URL + "/gamecharacters/list")
  }

  findGameCharacterById(idGameCharacter : Number){
    return this.http.get(AppSettings.APP_URL + "/gamecharacters/" + idGameCharacter)
  }

  saveGameCharacter(gameCharacter: GameCharacter){
    this.http.post(AppSettings.APP_URL + "/gamecharacters/add",gameCharacter)
  }

  shareGameCharacter(idGameCharacter: Number, sharedGameCharacter: boolean){
    return this.http.get(AppSettings.APP_URL + "/gamecharacters/share/" + idGameCharacter + sharedGameCharacter)
  }
}
