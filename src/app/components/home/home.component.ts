import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character/character.service';
import { Gamer } from 'src/app/models/gamer';
import { Router } from '@angular/router';
import { GameCharacter } from 'src/app/models/gameCharacter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../resources/bootstrap/css/bootstrap.min.css','../../resources/fontawesome/css/all.min.css','./home.component.scss']
})
export class HomeComponent implements OnInit {

  gamer : Gamer
  gameCharacters : GameCharacter[]
  errorMessage : string
  successMessage : string 

  constructor(private gameCharacterService : CharacterService, private router : Router) {
    this.checkGamer()
  }

  ngOnInit(): void {
    this.findAllGameCharacters()
  }

  findAllGameCharacters() {
    this.gameCharacterService.findAllGamerCharacters(this.gamer.idGamer)
    .subscribe(data => {
      this.gameCharacters = data
    },error =>{
      console.log(error);
    });
  }

  shareGameCharacter(idGameCharacter: number, shared: boolean){
    if(idGameCharacter == undefined){
      this.displayMessage("An error has occured while sharing the game character",2)
    }
    this.gameCharacterService.shareGameCharacter(idGameCharacter,shared)
    .pipe()
    .subscribe(data => {
      this.displayMessage("Character was successfully updated", 1)
      this.findAllGameCharacters()
    })
  }

  displayMessage(message : string, type : number){
    if(type === 1){
      this.successMessage = message
      setTimeout(()=> {this.successMessage = ""}, 5000)
    } else if (type === 2) {
      this.errorMessage = message
      setTimeout(()=> {this.errorMessage = ""}, 5000)
    }
  }


  checkGamer(){
    if(localStorage.getItem('currentGamer') === undefined || localStorage.getItem('currentGamer') === null){
      this.router.navigate(['/login']);
      return;
    }
    this.gamer = JSON.parse(localStorage.getItem('currentGamer'))
  }

}
