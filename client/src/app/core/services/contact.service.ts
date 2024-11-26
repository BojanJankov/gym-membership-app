import { inject, Injectable } from '@angular/core';
import { ContactApiService } from './contact-api.service';
import { ContactModel } from '../../feature/contact/models/contact.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiService = inject(ContactApiService);
  private notificationService = inject(NotificationService);

  createContact(contactRequest: ContactModel) {
    this.apiService.postContact(contactRequest).subscribe({
      next: () => {
        this.notificationService.showToast('Contact successfully send!', true);
      },
      error: (error) => {
        this.notificationService.showToast(
          'Contact unsuccessfully send. Try again.',
          false
        );
      },
    });
  }
}
