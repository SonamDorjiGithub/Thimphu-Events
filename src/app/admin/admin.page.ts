import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { UploadpicService } from '../../services/uploadpic/uploadpic.service';
import { Upload } from '../../models/upload/upload';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  movieTitle : any;
  movieVenue : any;
  movieTime : any;
  startDate : any;
  endDate : any;
  moviePrice : any;
  movieContact : any;
  movieTailor : any;
  start : any;
  movieData:any[]=[];
  title:any;
  desc:any;
  selectedFiles: FileList;
  currentUpload: Upload;
  constructor(
    private fs : AngularFirestore,
    private altCtl : AlertController,
    private navCtl : NavController,
    private datePicker: DatePicker,
    private uploadServ: UploadpicService
  )
  {
    //for retriving the data
    // this.fs.collection('/movies').get().subscribe(res=>
    //   {
    //     res.forEach((doc : any)=>
    //     {
    //       this.movieData.push({
    //         movietitle : doc.data().movietitle,
    //         venue : doc.data().venue
    //       })
    //     });
    //   })
    //   console.log(this.movieData);
  }

  detectFiles(event:any){
    this.selectedFiles = event.target.files;
  }
  ngOnInit() {
  }
  // uploadSingle() {
  //   let file = this.selectedFiles.item(0)
  //   this.currentUpload = new Upload(file);
  //   this.uploadServ.pushUpload(this.currentUpload)
  // }

  // uploadMulti() {
  //   let files = this.selectedFiles
  //   let filesIndex = _.range(files.length)
  //   _.each(filesIndex, (idx) => {
  //     this.currentUpload = new Upload(files[idx]);
  //     this.uploadServ.pushUpload(this.currentUpload)}
  //   )
  // }
  //for uploading the the data
  insertFs(){
    let basePath:string="/movies";
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.fs.collection(`${basePath}`).doc(`${this.movieTitle}`).set(
      {
      movietitle : this.movieTitle,
      venue : this.movieVenue,
      time : this.movieTime,
      startdate : this.startDate, 
      enddate : this.endDate,
      price : this.moviePrice,
      contact : this.movieContact,
      tailor : this.movieTailor
    }
    ).then(data=>
      {
        console.log(data);
        this.uploadServ.pushUpload(this.currentUpload,basePath,this.movieTitle);
      }
      )
      
  }
  async alert(header : any, message : any)
  {
    this.altCtl.create(
      {
        header : header, 
        message : message,
        buttons:[
          {
            text : 'okay',
            handler:()=>
            {
              this.navCtl.navigateForward('/home');
            }
          }
        ]
      }
    )
  }

  pickDate(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
