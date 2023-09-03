import { Component, inject } from '@angular/core';
import { IAllUser } from 'src/app/interfaces/allusers';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  arrUsers: IAllUser = <IAllUser>{};
  userService = inject(UserService);

  async ngOnInit(): Promise<void> {
    try {
      this.arrUsers = await this.userService.getAllUsers()
    }
    catch(error) {
      console.log(error);
    }
  }
}
