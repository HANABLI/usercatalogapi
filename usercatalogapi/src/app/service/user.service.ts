import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../interface/user.interface';
import { Response } from '../interface/response.interface';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = 'https://randomuser.me/api';

  constructor(private http: HttpClient) { }

  // Fetch users.
  getUsers(size: number = 10): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/?results=${size}`).pipe
    //(map(response => this.processResponse(response)));
    (map(this.processResponse));
  }

  // Fetch one user using the user UUID.
  getUser(uuid: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/?uuid=${uuid}`).pipe(map(response => this.processResponse(response)))
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((user: any) => (<User>{
        uuid: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        username: user.login.username,
        gender: user.gender,
        address: `${user.location.street.number} ${user.location.street.name} ${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
        dateOfBirth: user.dob.date,
        imageUrl: user.picture.medium,
        coordinate: { latitude: user.location.coordinates.latitude, longitude: user.location.coordinates.longitude, }
      }))
    };
  }
}
