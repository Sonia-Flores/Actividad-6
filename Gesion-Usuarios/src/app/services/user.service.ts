import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IAllUser } from '../interfaces/allusers';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'https://peticiones.online/api/users/';
  constructor(private httpClient:HttpClient) { }

  getAllUsers(): Promise<IAllUser>{
    return lastValueFrom(this.httpClient.get<IAllUser>(this.baseUrl));
  }

  getUserById(id: string): Promise<IUser>{
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}${id}`));
  }

  newUser(formValue: IUser): Promise<IUser>{
    return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, formValue))
  }

  updateUser(formValue: IUser): Promise<IUser>{
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}${formValue._id}`, formValue))
  }

  deleteUser(id: string): Promise<IUser>{
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}${id}`));
  }
}
