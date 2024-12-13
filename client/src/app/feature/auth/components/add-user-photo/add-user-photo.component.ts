import { Component, inject } from '@angular/core';
import { UserPhotoFormComponent } from '../user-photo-form/user-photo-form.component';
import { AuthService } from '../../../../core/services/auth.service';
import { UserDetailsService } from '../../../../core/services/user-details.service';
import { PorfilePhotoReq } from '../../models/auth.model';

@Component({
  selector: 'app-add-user-photo',
  standalone: true,
  imports: [UserPhotoFormComponent],
  templateUrl: './add-user-photo.component.html',
  styleUrl: './add-user-photo.component.scss',
})
export class AddUserPhotoComponent {
  private authService = inject(AuthService);
  private userDetailsService = inject(UserDetailsService);

  onAddPhoto(profilePhoto: PorfilePhotoReq) {
    this.userDetailsService.addPhotoToUser(
      this.authService.currentUser().userDetails.id,
      profilePhoto
    );
  }
}
