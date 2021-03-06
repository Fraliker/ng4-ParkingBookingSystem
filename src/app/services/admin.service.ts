import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {  AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import * as firebase from 'firebase/app';

@Injectable()
export class AdminService {
  CDGKBooking = [];
  gulshanBooking = [];
  DHABooking = [];
  CDGKBookingKeys = [];
  gulshanBookingKeys = [];
  DHABookingKeys = [];
  userData = [];
  userKeys = [];
  constructor(public _AngularFireAuth: AngularFireAuth, public _AngularFireDatabase: AngularFireDatabase, public _Router: Router,private _Location:Location) {}
  signIn(data:any): any{
    if(data.type == 'admin' && data.email == 'admin@gmail.com' && data.password == 'admin123'){
        //login authentication with firebase
        firebase.auth().signInWithEmailAndPassword(data.email, data.password).then((successfull) => {
            localStorage.setItem('currentUserEmail', data.email);
            this._Router.navigate(['/admin-dashboard']);
        }).catch(function(error) {
          // Handle Errors here.
          var errorMessage = error.message;
        });
    }
    else{
      alert('you are not admin');
    }
 
  }

  logout(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).then((successfull) => {
        this._Router.navigate(['/admin']);
    }).catch(function(error) {
        // An error happened.
    });
    localStorage.setItem('currentUserEmail', null);
    localStorage.setItem('currentUserKey', null);
    localStorage.setItem('currentUserData', null );
  }

  isLogin(){
    this._AngularFireAuth.authState.subscribe((user: firebase.User)=>{
      if(user){
        this._Router.navigate(['/admin-dashboard']);
      }
    });
  }

  fetchCDGKBooking(){
    return this._AngularFireDatabase.list('/CDGKreservedSlotsList');
    // firebase.database().ref('/CDGKreservedSlotsList/').on('child_added', (snapshot) => {
    //     this.CDGKBooking.push(snapshot.val());
    //     this.CDGKBookingKeys.push(snapshot.key);
    // });
    // return this.CDGKBooking;
  }

   getDetailCDGKSlot(key){
    let slotDetail;
    this._AngularFireDatabase.list('/CDGKreservedSlotsList').subscribe(slots => {
        slots.forEach(slot => {
          if(slot.$key == key){
              slotDetail = slot
          }
        });
    })
    return slotDetail;
  }

  // cancelCDGKBooking(index){
  //   let key = this.CDGKBookingKeys[index];
  //   firebase.database().ref('CDGKreservedSlotsList').child(key).remove();
  // }

  cancelCDGKBooking(key){
    this._AngularFireDatabase.list('/CDGKreservedSlotsList').remove(key); 
  }

  fetchGulshanBooking(){
    return this._AngularFireDatabase.list('/gulshanReservedSlotsList');
    // firebase.database().ref('/gulshanReservedSlotsList/').on('child_added', (snapshot) => {
    //     this.gulshanBooking.push(snapshot.val());
    // });
    // firebase.database().ref('/gulshanReservedSlotsList/').on('child_added', (snapshot) => {
    //     this.gulshanBookingKeys.push(snapshot.key);
    // });
    // return this.gulshanBooking;
  }

  getDetailGulshanSlot(key){
    let slotDetail;
    this._AngularFireDatabase.list('/gulshanReservedSlotsList').subscribe(slots => {
        slots.forEach(slot => {
          if(slot.$key == key){
              slotDetail = slot
          }
        });
    })
    return slotDetail;
  }

  cancelGulshanBooking(key){
    this._AngularFireDatabase.list('/gulshanReservedSlotsList').remove(key); 
  }

  fetchDHABooking(){
    return this._AngularFireDatabase.list('/DHAreservedSlotsList');
    // firebase.database().ref('/DHAreservedSlotsList/').on('child_added', (snapshot) => {
    //     this.DHABooking.push(snapshot.val());
    // });
    // firebase.database().ref('/DHAreservedSlotsList/').on('child_added', (snapshot) => {
    //     this.DHABookingKeys.push(snapshot.key);
    // });
    // return this.DHABooking;
  }

  getDetailDHASlot(key){
    let slotDetail;
    this._AngularFireDatabase.list('/DHAreservedSlotsList').subscribe(slots => {
        slots.forEach(slot => {
          if(slot.$key == key){
              slotDetail = slot
          }
        });
    })
    return slotDetail;
  }

  cancelDHABooking(key){
    this._AngularFireDatabase.list('/DHAreservedSlotsList').remove(key);
  }

  //Searching By Slots
  searchCDGKSlot(slotNumber){
    return this._AngularFireDatabase.list('/CDGKreservedSlotsList', {
              query: {
                orderByChild: 'slotNumber',
                equalTo: slotNumber
              }
          });
  }

  searchGulshanSlot(slotNumber){
    return this._AngularFireDatabase.list('/gulshanReservedSlotsList', {
              query: {
                orderByChild: 'slotNumber',
                equalTo: slotNumber
              }
          });
  }

  searchDHASlot(slotNumber){
    return this._AngularFireDatabase.list('/DHAreservedSlotsList', {
              query: {
                orderByChild: 'slotNumber',
                equalTo: slotNumber
              }
          });
  }

  /////////////////// USERS ////////////////////
  
  // fetchUsers() {
  //     firebase.database().ref('/users/').on('child_added', (snapshot) => {
  //       this.userData.push(snapshot.val());
  //     });

  //     firebase.database().ref('/users/').on('child_added', (snapshot) => {
  //       this.userKeys.push(snapshot.key);
  //     });
  // }

  getUsers(){
    return this._AngularFireDatabase.list('/users');
  }

  getUserDetail(key){
    return this._AngularFireDatabase.object('/users/' + key);
  }

  // blockUser(index,data){
  //   let key = this.userKeys[index];
  //   data.status = "de-active"
  //   firebase.database().ref('users').child(key).set(data);
  // }

  // unBlockUser(index,data){
  //   let key = this.userKeys[index];
  //   data.status = "active"
  //   firebase.database().ref('users').child(key).set(data);
  // }

  ////////////// FEEDBACK ///////////////
  feedsUsers = [];
  userData4Feeds = [];
  userKeys4Feeds = [];
  getFeedsUsers(){
    //this.fetchUsers();
    firebase.database().ref('/users/').on('child_added', (snapshot) => {
      this.userData4Feeds.push(snapshot.val());
    });

    firebase.database().ref('/users/').on('child_added', (snapshot) => {
      this.userKeys4Feeds.push(snapshot.key);
    });

    firebase.database().ref('/feedback/').on('child_added', (snapshot) => {
        this.userKeys4Feeds.forEach((key,i)=>{
            if(snapshot.key == key){
              this.userData4Feeds[i].key = key;
              this.feedsUsers.push(this.userData4Feeds[i]);
            }
        })
    })
     return this.feedsUsers;
  }

  clearFeedsUsers(){
    this.userData4Feeds = [];
    this.userKeys4Feeds = [];
    return this.feedsUsers = [];
  }

  showMessage(key,index){
    let messages = []
    firebase.database().ref('/feedback/' + key).on('child_added', (snapshot) => {
      messages.push(snapshot.val());
    });
    return messages;
  }

  replyToUser(data,key){
    firebase.database().ref('feedback').child(key).push(data);
  }

 
}
