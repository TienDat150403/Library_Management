import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'app/_service/comm/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading: boolean = false;
  // constructor(
  //   private loaderService: LoaderService
  // ) {
  //   this.loaderService.isLoading.subscribe((v) => {
  //     this.loading = v;
  //   });
  // }

  ngOnInit(): void {
  }

}
