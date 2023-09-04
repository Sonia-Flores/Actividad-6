import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  miUser = <IUser>{};
  newUser: boolean = true;
  userForm: FormGroup;
  submited: boolean = false;
  userService = inject(UserService);
  router = inject(Router);

  constructor(private activatedRoute: ActivatedRoute) {
    this.userForm = new FormGroup({
      first_name: new FormControl('', [
        Validators.required
      ]),
      last_name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      username: new FormControl('', [
        Validators.required
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern("^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$")
      ]),
    })
  }

  async ngOnInit(): Promise<void> {
    let routeId: string = "";
    try {
      this.activatedRoute.params.subscribe(params => {
        routeId = params['id'];
      });
      if(routeId){
        this.newUser = false;
        this.miUser = await this.userService.getUserById(routeId);
        this.userForm = new FormGroup({
          first_name: new FormControl(this.miUser.first_name, [
            Validators.required,
          ]),
          last_name: new FormControl(this.miUser.last_name, [
            Validators.required,
          ]),
          email: new FormControl(this.miUser.email, [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$")
          ]),
          username: new FormControl(this.miUser.username, [
            Validators.required
          ]),
          image: new FormControl(this.miUser.image, [
            Validators.required,
            Validators.pattern("^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$")
          ]),
        })
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  async getDataForm(): Promise<void>{
    this.submited = true;

    //comprobación de datos e inserción en array
    if(this.userForm.invalid){
      return;
    } else {
        this.miUser.first_name = this.userForm.value.first_name,
        this.miUser.last_name = this.userForm.value.last_name,
        this.miUser.email = this.userForm.value.email,
        this.miUser.username = this.userForm.value.username,
        this.miUser.image = this.userForm.value.image
    };

    let response;
    if(this.miUser.id){
      response = await this.userService.updateUser(this.miUser);
    }else{
      response = await this.userService.newUser(this.miUser);
    }

    if(response.id){
      if(this.newUser){
        alert('Usuario Creado correctamente');}
      else{
        alert('Usuario Modificado correctamente');
      }
      this.submited = false;
      this.userForm.reset();
      this.router.navigate(['/home'])
    }else{
      alert('Error, intentalo de nuevo');
    }
  }
}