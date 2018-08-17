import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [UserService]
})
export class FooterComponent implements OnInit {

  public token;
  public identity;
  constructor(private _userService: UserService) {
    this.token= this._userService.getToken();
    this.identity= this._userService.getIdentity();
  }

  ngOnInit() {

  }

}
