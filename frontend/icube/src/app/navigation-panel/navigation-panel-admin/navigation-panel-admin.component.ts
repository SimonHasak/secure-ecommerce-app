import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: 'app-navigation-panel-admin',
  templateUrl: './navigation-panel-admin.component.html',
  styleUrls: ['./navigation-panel-admin.component.css']
})
export class NavigationPanelAdminComponent implements OnInit {

  @Output()
  logOutEvent = new EventEmitter();

  @Input()
  isAdmin: boolean = true;

  @Input()
  isAuthenticated: boolean = true;

  categories: String[] = ['banners', 'products', 'orders', 'users'];

  constructor(private router: Router) {
    this.stickyNavbarToggle();
  }

  ngOnInit(): void {
    this.setScrollUpButton();
    this.createMobileNavbar();
  }

  navigateTo(category: String) {
    this.router.navigate(['admin', category]);

    // if  (category == Category.NONE) {
    // } else {
    //   this.router.navigate(['category/', category]);
    // }
  }

  logOutMethodEvent() {
    this.logOutEvent.emit();
  }

  stickyNavbarToggle(){
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 100) {
        $('#header').addClass('header-fixed');
      } else {
        $('#header').removeClass('header-fixed');
      }
    });
  }

  setScrollUpButton(){
    let btn = <HTMLElement>document.querySelector('.scroll-to-top');
    if(btn == null)
      return;

    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 300) {
        $('.scroll-to-top').css('visibility', 'visible');
      } else {
        $('.scroll-to-top').css('visibility', 'hidden');
      }
    });

    this.scrollUpButtonAction(btn);
  }

  scrollUpButtonAction(btn: HTMLElement) {
    btn.onclick = () => {
      window.scrollTo(0,0);
    }
  }

  createMobileNavbar(){
    if ($('#nav-menu-container').length) {
      // var $mobile_nav = $('#nav-menu-container').clone().prop({
      //   id: 'mobile-nav'
      // });

      $('#mobile-nav').find('> ul').attr({
        'class': '',
        'id': ''
      });

      // $('header').append($mobile_nav);
      $('header').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
      $('header').append('<div id="mobile-body-overly"></div>');
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

      $(document).on('click', '.menu-has-children i', function(e) {
        $(this).next().toggleClass('menu-item-active');
        $(this).nextAll('ul').eq(0).slideToggle();
        $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });

      $(document).on('click', '#mobile-nav-toggle', function (e) {
        $('header').toggleClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('#mobile-body-overly').toggle();
      });

      $(document).on('click',function (e) {
        var container = $("#mobile-nav, #mobile-nav-toggle");

        if (!container.is(<any>e.target) && container.has(<any>e.target).length === 0) {
          if ($('header').hasClass('mobile-nav-active')) {
            $('header').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
          }
        }
      });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
    }
  }

}
