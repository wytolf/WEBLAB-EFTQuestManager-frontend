import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {catchError, from, Observable, Subscription, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fireUser: any = null;
  user?: User;
  authStateSubscription!: Subscription;
  isUserLoggedIn: boolean = false;

  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient
  ) {
    auth.user.subscribe((user: any | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      this.fireUser = user;
      this.isUserLoggedIn = (user !== null);
      console.log(user);
    });
  }

  signIn(params: SignIn): Observable<any> {
    console.log("try to sign in")
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  register(params: Register) {
    console.log("register wurde aufgerufen");

    return this.http.post<User>('http://127.0.0.1:4555/api/register', params, this.getStandardOptions()).subscribe({
      next: () => this.signIn(params),
      error: error => {
        console.log("error while login:" + error);
      }
    });
  }

  logout() {
    console.log("try to sign in")
    this.user = undefined;
    this.isUserLoggedIn = false;
    return from(this.auth.signOut()).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  isLoggedIn(): boolean {
    if (this.fireUser !== null) {
      console.log("user is logged in, uid:" + this.fireUser.uid);
      return true;
    }
    console.log("no user logged in");
    return false;
  }

  getLoggedInUserId(): string {
    return this.fireUser.uid;
  }

  rememberUser(email: string) {
    console.log("rememberUser wurde aufgerufen");
    return this.http.get<User>('http://127.0.0.1:4555/api/user/' + email).subscribe((user: User) => {
      this.user = user;
    });
  }

  private getStandardOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  private translateFirebaseErrorMessage({code, message}: FirebaseError) {
    if (code === "auth/user-not-found") {
      return "User not found.";
    }
    if (code === "auth/wrong-password") {
      return "User not found.";
    }
    return message;
  }
}

type SignIn = {
  email: string;
  password: string;
}

type FirebaseError = {
  code: string;
  message: string
};

type Register = {
  password: string;
  role: string;
  email: string;
  username: string
}


