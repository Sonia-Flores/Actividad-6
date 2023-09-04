import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() miUser!: IUser

  userService = inject(UserService);
  router = inject(Router);

  async deleteUser(id: string): Promise<void>{
    if(confirm('¿Estás seguro de borrar este usuario?') == true){
      let response = await this.userService.deleteUser(id);
      if(response){
        alert('Usuario borrado correctamente');
        this.router.navigate(['/home'])
      }
    }
  }

}
