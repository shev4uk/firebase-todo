import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  ) { }

  ngOnInit() {
      this.userDoc = this.afs.doc(`users/${this.auth.user}`);
      this.userDoc.valueChanges().subscribe( data => {
        console.log(data);
      })
      this.tasks = this.userDoc.collection('list').valueChanges();
      // this.tasks = this.userDoc.collection('list').snapshotChanges().pipe(
      //   map(actions => 
      //     actions.map(a => {
      //     const data = a.payload.doc.data();
      //     const id = a.payload.doc.id;
      //     return { id, ...data };
      //   }))
      // );
  }

}
