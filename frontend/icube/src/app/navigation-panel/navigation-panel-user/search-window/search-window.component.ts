import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {Subscription, Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-window',
  templateUrl: './search-window.component.html',
  styleUrls: ['./search-window.component.css']
})
export class SearchWindowComponent implements OnInit {
  @ViewChild('input')
  searchBar: ElementRef;

  @Input()
  subject:Subject<any>;
  isDisplayed: Boolean = false;
  searchedKeyword: String;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.subject.subscribe(e => {
      this.isDisplayed = true;
    });
  }

  ngAfterViewChecked(): void {
    this.searchBar.nativeElement.focus();
  }

  hideSearchWindow(){
    this.isDisplayed = false;
  }

  resetSearchValue(){
    this.searchBar.nativeElement.value = "";
  }

  executeSearch() {
    this.searchedKeyword = this.searchBar.nativeElement.value;
    
    if(this.searchedKeyword.length === 0)
      return;

    this.router.navigate(['/search-results/' + this.searchedKeyword]);
    this.resetSearchValue();
    this.hideSearchWindow();
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }

}
