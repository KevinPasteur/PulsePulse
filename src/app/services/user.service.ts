import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.apiUrl}/users`;

  constructor(private readonly http: HttpClient) { }

  getExercisesFromAUser(userId: string): Observable<any> {
    return this.http.get(`${this.url}/${userId}/exercises`);
  }
}
