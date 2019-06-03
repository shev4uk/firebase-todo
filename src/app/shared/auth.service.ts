import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) { 
    // Define the user observable
    this.afAuth.authState.subscribe( user => {
      console.log(user.uid);
    })
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  manualLogin(user) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(user => {
        console.log(user);
        this.router.navigate(['user/profile']);
      })
      .catch(error => this.handleError(error) );
  }

  manualReg(user) {
    console.log(user);
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(user => {
        console.log(user);
        // return this.setUserDoc(user) // create initial user document
        this.router.navigate(['user/login']);
      })
      .catch(error => this.handleError(error) );
  }

  // private setUserDoc(user) {

  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   console.log(userRef);

  //   const data: User = {
  //     uid: user.uid,
  //     email: user.email || null
  //   }
  //   console.log(data);

  //   return userRef.set(data)

  // }


  private handleError(error) {
    console.error(error)
  }

  testData() {
    this.afs.doc('user/8yaKhCbRIyQ6a5WixRRcyvaJEzC3').collection(`list`).add({'name': 'test 2'});
  }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigate(['user/login']);
  }

  getLoggedInUser() {
    return this.afAuth.authState;
  }
}
