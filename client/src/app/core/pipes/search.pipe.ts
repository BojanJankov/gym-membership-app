import { Pipe, PipeTransform } from '@angular/core';
import { Membership } from '../../feature/memberships/models/memberships.model';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(value: Membership[], searchValue: string) {
    if (!searchValue) return value;

    console.log(searchValue);

    const filteredMemberships = value.filter(
      (membership) =>
        membership.user.firstName
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()) ||
        membership.user.lastName
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim())
    );

    console.log(filteredMemberships);

    return filteredMemberships;
  }
}
