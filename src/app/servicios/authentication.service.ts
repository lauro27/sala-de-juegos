import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user, signOut} from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { switchMap, map } from 'rxjs';
import { UserInterface } from '../interfaces/user';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);
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
  isLoggedIn(){
    return !!this.currentUserSig;
  }

  checkAdmin(){
    return user(this.firebaseAuth).pipe(
      switchMap(user => {
        if (user) {
          const adminQuery = query(
            collection(this.firestore, 'admins'),
            where('email', '==', user.email),
            where('active', '==', true)
          );
          return from(getDocs(adminQuery)).pipe(
            map(snapshot => !snapshot.empty)
          );
        } else {
          return of(false);
        }
      })
    );
  }
}
