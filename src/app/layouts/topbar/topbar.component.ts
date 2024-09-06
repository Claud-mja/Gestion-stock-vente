import { changetheme } from '@/app/store/layout/layout-action'
import { getLayoutColor } from '@/app/store/layout/layout-selector'
import { Component, EventEmitter, Output, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { SimplebarAngularModule } from 'simplebar-angular'
import { TabItems } from './data'
import { AuthenticationService } from '@/app/core/service/auth.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    NgbDropdownModule,
    SimplebarAngularModule,
    NgbNavModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  selectedLanguage = {
    flag: 'assets/images/flags/us_flag.jpg',
    name: 'Anglais',
    langCode: 'en' 
  };

  languages = [
    { flag: 'assets/images/flags/us_flag.jpg', name: 'Anglais', langCode: 'en' },
    { flag: 'assets/images/flags/french_flag.jpg', name: 'Français', langCode: 'fr' }
  ];

  tabItems = TabItems
  store = inject(Store)
  scrollY = 0
  @Output() mobileMenuButtonClicked = new EventEmitter()

  constructor(private authService: AuthenticationService, private router: Router) {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.handleScroll()
  }

  toggleMobileMenu() {
    this.mobileMenuButtonClicked.emit()
  }
  changeLanguage(language: { flag: string; name: string; langCode: string }): void {
    this.selectedLanguage = language;
    this.translatePage(language.langCode);  
  }

  translatePage(langCode: string): void {
    if (langCode === 'en') {
      console.log('Switched to English');
    } else if (langCode === 'fr') {
      console.log('Switched to French');
    }
  }

  logOut() {
    if (confirm("Se deconnecter du site ?")) {
      this.authService.logout()
      this.router.navigate(['/auth/log-in']);
    }
  }

  changeTheme() {
    const color = document.documentElement.getAttribute('data-bs-theme')
    if (color == 'light') {
      this.store.dispatch(changetheme({ color: 'dark' }))
    } else {
      this.store.dispatch(changetheme({ color: 'light' }))
    }
    this.store.select(getLayoutColor).subscribe((color) => {
      document.documentElement.setAttribute('data-bs-theme', color)
    })
  }

  handleScroll = () => {
    this.scrollY = window.scrollY
  }
}
