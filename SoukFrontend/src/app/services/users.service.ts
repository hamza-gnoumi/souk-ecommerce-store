import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly userUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.userUrl);
  }

  getUserById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.userUrl}/${id}`);
  }

  createUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.userUrl, user);
  }

  updateUser(id: string, user: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.userUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/${id}`);
  }

}
