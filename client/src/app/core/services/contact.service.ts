import { inject, Injectable } from '@angular/core';
import { ContactApiService } from './contact-api.service';
import { ContactModel } from '../../feature/contact/models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiService = inject(ContactApiService);

  createContact(contactRequest: ContactModel) {
    this.apiService.postContact(contactRequest).subscribe({
      next: () => {
        console.log('Contact successfully send!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
