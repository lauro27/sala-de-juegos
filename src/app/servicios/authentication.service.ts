import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user, signOut} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined)
  
  
  register(email:string, username:string, password:string): Observable<void>{
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email, 
      password)
        .then((response)=> updateProfile(response.user, {displayName:username}));
    return from(promise);
  }
  
  login(email: string, password: string): Observable<void>{
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(()=>{});
    return from(promise);
  }

  logOut():Observable<void>{
    const promise = signOut(this.firebaseAuth);
    this.currentUserSig = signal(null);
    return from(promise);
  }
}
