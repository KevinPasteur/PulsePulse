import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, filter, map, from, delayWhen } from 'rxjs';
import { AuthResponse } from './auth-response.model';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { AuthRequest } from './auth-request.model';
import { RegisterRequest } from './register-request.model';
import { RegisterResponse } from './register-response.model';
import { Storage } from '@ionic/storage-angular';

import { environment } from 'src/environments/environment';

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;
  #register$: ReplaySubject<RegisterResponse | undefined>;

  constructor(private http: HttpClient, private readonly storage: Storage) {
    this.#auth$ = new ReplaySubject(1);
    this.#register$ = new ReplaySubject(1);
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.#auth$.next(auth);
    });
    // Emit an undefined value on startup for now
    //this.#auth$.next(undefined);
  }

  /**
   * @returns An `Observable` that will emit a `boolean` value
   * indicating whether the current user is authenticated.
   * This `Observable` will never complete and must be unsubscribed for when not needed.
   */
  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated `User` object only if there
   * currently is an authenticated user.
   */
  getUser$(): Observable<User | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.user));
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated user's `token`, only if there
   * currently is an authenticated user.
   */
  getToken$(): Observable<string | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  /**
   * Sends an authentication request to the backend API in order to log in a user with the
   * provided `authRequest` object.
   *
   * @param authRequest An object containing the authentication request params
   * @returns An `Observable` that will emit the logged in `User` object on success.
   */
  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${environment.apiUrl}/users/login`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen((auth) => this.#saveAuth$(auth)),
      map((auth) => {
        this.#auth$.next(auth);
        return auth.user;
      })
    );
  }

  register$(registerRequest: RegisterRequest): Observable<any> {
    const authUrl = `${environment.apiUrl}/users/register`;
    return this.http.post<RegisterResponse>(authUrl, registerRequest).pipe(
      map((register) => {
        this.#register$.next(register);
        console.log(`User ${register.email} registered`);
        return register;
      })
    );
  }

  /**
   * Logs out the current user.
   */
  logOut(): void {
    this.#auth$.next(undefined);
    this.storage.remove('auth');
    console.log('User logged out');
  }

  /**
   * Persists the provided `AuthResponse` to the storage.
   *
   * @param auth The AuthResponse to persist
   * @returns An `Observable` that will emit when the authentication is persisted
   */
  #saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }
}
