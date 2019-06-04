import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) { 
    this.afAuth.authState.subscribe( user => {
      if(user) this.user = user.uid;
      console.log(this.user);
    })
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  manualLogin(user) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(user => {
        this.router.navigate(['user/profile']);
      })
      .catch(error => this.handleError(error) );
  }

  manualReg(user) {
    console.log(user);
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        console.log(data);
        this.afs.collection(`users`).doc(data.user.uid).set({'email': data.user.email, 'userId':  data.user.uid });
        this.router.navigate(['user/profile']);
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
    this.afs.doc(`users/${this.user}`).collection(`list`).add({'name': 'test 1'}).then(res => {
      console.log(res);
      this.afs.doc(`users/${this.user}`).collection(`list`).doc(res.id).collection(`item`).add({'name': 'item 1'})
    });
  }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigate(['user/login']);
  }

  getLoggedInUser() {
    return this.afAuth.authState;
  }
}
