import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.navigate(['folder/Inbox/desayuno'])
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  segmentChanged($event) {
    let tipo = $event.detail.value;
    this.router.navigate(['folder/Inbox/' + tipo]);
  }

  /*getItem($event){
    const valor =  $event.target.value;
    return this.database.executeSql()
  }*/


}
