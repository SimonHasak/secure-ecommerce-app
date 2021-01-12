import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BannersService} from "../../shared/services/banners-service";
import {Advertisement} from "../../shared/models/advertisement";

@Component({
  selector: 'app-advertisement-panel',
  templateUrl: './advertisement-panel.component.html',
  styleUrls: ['./advertisement-panel.component.css']
})
export class AdvertisementPanelComponent implements OnInit {

  @Output() isLoading = new EventEmitter<boolean>();

  advertisement: Advertisement;

  constructor(private bannersService: BannersService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.bannersService.getAdvertisement().subscribe(data => {
      this.advertisement = data;
      this.stopLoading();
    });
  }

  stopLoading() {
    this.isLoading.emit(false);
  }

}
