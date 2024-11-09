import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ContactModel } from '../../feature/contact/models/contact.model';
import { BASE_URL } from '../constants/core.constants';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private http = inject(HttpClient);

  postContact(request: ContactModel) {
    return this.http.post(`${BASE_URL}/contact`, request);
  }
}
