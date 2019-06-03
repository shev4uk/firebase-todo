import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection;
  items: Observable<any>;
  userDoc;
  tasks;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.itemsCollection = this.afs.collection('list');
    this.items = this.itemsCollection.valueChanges();

    this.afAuth.authState.subscribe( user => {
      console.log(user.uid);
      const uid = user.uid;
      this.userDoc = this.afs.doc(`user/${uid}`);
      this.tasks = this.userDoc.collection('list').valueChanges();
    })
  }

}
