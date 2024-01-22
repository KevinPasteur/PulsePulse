import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, filter, map } from "rxjs";
import { AuthResponse } from "./auth-response.model";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { AuthRequest } from "./auth-request.model";

/***********************************************************/
/*********!!! REPLACE BELOW WITH YOUR API URL !!! **********/
/***********************************************************/
const API_URL = "<REPLACE_ME>";

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: "root" })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient) {
    this.#auth$ = new ReplaySubject(1);
    // Emit an undefined value on startup for now
    this.#auth$.next(undefined);
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
    const authUrl = `${API_URL}/auth`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      map((auth) => {
        this.#auth$.next(auth);
        console.log(`User ${auth.user.name} logged in`);
        return auth.user;
      })
    );
  }

  /**
   * Logs out the current user.
   */
  logOut(): void {
    this.#auth$.next(undefined);
    console.log("User logged out");
  }
}