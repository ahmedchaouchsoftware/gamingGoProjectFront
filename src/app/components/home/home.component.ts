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

  constructor(private gameCharacterService : CharacterService, private router : Router) {
    this.checkGamer()
  }

  ngOnInit(): void {
    this.gameCharacterService.findAllGamerCharacters(this.gamer.idGamer)
    .subscribe(data => {
      this.gameCharacters = data
    },error =>{
      console.log(error);
    });
  }

  checkGamer(){
    if(localStorage.getItem('currentGamer') === undefined || localStorage.getItem('currentGamer') === null){
      this.router.navigate(['/login']);
      return;
    }
    this.gamer = JSON.parse(localStorage.getItem('currentGamer'))
  }

}
