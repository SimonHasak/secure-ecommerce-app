import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  isLoadingIS: boolean = true;
  isLoadingHPP: boolean = true;
  isLoadingA: boolean = true;

  constructor(private spinner: NgxSpinnerService) { this.spinner.show('root-spinner'); }

  ngOnInit() {

  }

  isLoadingImageSlider(isLoading: boolean){
    this.isLoadingIS = isLoading;
    this.checkForStoppingRootSpinner();
  }

  isLoadingHomePageProducts(isLoading: boolean){
    this.isLoadingHPP = isLoading;
  }

  isLoadingAdvertisement(isLoading: boolean){
    this.isLoadingA = isLoading;
    this.checkForStoppingRootSpinner();
  }

  checkForStoppingRootSpinner() {
    if (!(this.isLoadingIS || this.isLoadingA)) {
      setTimeout(() => {
        /** spinner ends after 2 seconds */
        this.spinner.hide('root-spinner');
      }, 2000);
    }
  }

}
