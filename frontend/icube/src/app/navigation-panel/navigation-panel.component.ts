import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../shared/services/auth-service";
import {LoginComponent} from "../user/login/login.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../shared/services/user.service";
import {LoginForm} from "../shared/models/loginForm";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.css']
})
export class NavigationPanelComponent implements OnInit {

  @Output() passLoginForm: EventEmitter<any> = new EventEmitter();

  isAdmin: boolean = false;
  isAuthenticated: boolean = false;

  public loginForm: LoginForm;

  constructor(private authService: AuthService,
              private modalService: NgbModal,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    // TODO if is admin and is not on /admin url -> redirect him there
    this.updateAuthenticationState();
  }

  openLoginModal() {
    if (!this.isAuthenticated) {
      const modalRef = this.modalService.open(LoginComponent);
      modalRef.componentInstance.loginData = this.loginForm;

      modalRef.result.then((result) => {
        if (result) {
          console.log('data back from login modal');
          this.updateAuthenticationState(true);
        }
      }).catch(error => console.log(error));

    }
  }

  updateAuthenticationState(updateLocation: boolean = false) {
    this.isAuthenticated = this.authService.isAuthenticated();

    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;

      if (updateLocation) {
        isAdmin ? this.router.navigate(['/admin']) : location.reload();
      }
    });
  }

  logOut() {
    this.userService.logout();
    this.updateAuthenticationState(true);
  }

}
