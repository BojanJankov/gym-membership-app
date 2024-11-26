import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../feature/auth/models/auth.model';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(value: User[], searchValue: string) {
    if (!searchValue) return value;

    console.log(searchValue);

    const filteredUsers = value.filter(
      (user) =>
        user.firstName
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()) ||
        user.lastName.toLowerCase().includes(searchValue.toLowerCase().trim())
    );

    return filteredUsers;
  }
}
