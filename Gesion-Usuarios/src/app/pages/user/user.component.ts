import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  miUser: IUser = <IUser>{};
  userService = inject(UserService);
  router = inject(Router);

  constructor(private activatedRoute: ActivatedRoute){}

  async ngOnInit(): Promise<void> {
    let routeId: string = "";
    try {
      this.activatedRoute.params.subscribe(params => {
        routeId = params['id'];
      });
      this.miUser = await this.userService.getUserById(routeId);
    }
    catch(error) {
      console.log(error);
    }
  }

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