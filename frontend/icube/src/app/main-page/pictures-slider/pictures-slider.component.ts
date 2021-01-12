import {Component, OnInit, Output} from '@angular/core';
import {BannersService} from "../../shared/services/banners-service";
import {ImageSlider} from "../../shared/models/imageSlider";
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pictures-slider',
  templateUrl: './pictures-slider.component.html',
  styleUrls: ['./pictures-slider.component.css'],
})
export class PicturesSliderComponent implements OnInit{

  @Output() isLoading = new EventEmitter<boolean>();

  imageSlider: ImageSlider;

  constructor(private bannersSlider: BannersService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.bannersSlider.getImageSlider().subscribe(data => {
      this.imageSlider = data;
      this.stopLoading();
    });
  }

  stopLoading() {
    this.isLoading.emit(false);
  }


}
