import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;
  private renderer = inject(Renderer2);
  private router = inject(Router);

  dropdownEl = viewChild<ElementRef>('dropdown');

  isDropdownOpen = signal(false);

  ngAfterViewInit() {
    this.renderer.listen(document, 'click', (e) => {
      if (!this.dropdownEl().nativeElement.contains(e.target)) {
        this.isDropdownOpen.set(false);
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen.update((prev) => !prev);
  }

  onLogutClick() {
    this.authService.logOutUserFromServer();
    this.authService.logOutUser();
  }

  onUserSettings() {
    this.router.navigate(['user-panel']);
  }
}
