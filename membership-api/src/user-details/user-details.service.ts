import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetails } from './entities/user-details.entity';
import { Repository } from 'typeorm';
import { CreateUserDetailsDto } from './dto/create-user-details.dto';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { CreateUserPhotoDto } from './dto/create-user-photo.dto';

@Injectable()
export class UserDetailsService {
  constructor(
    @InjectRepository(UserDetails)
    private usersDetailsRepo: Repository<UserDetails>,
  ) {}

  async create(userId: string, createUserDetailsDto: CreateUserDetailsDto) {
    return await this.usersDetailsRepo.save({
      ...createUserDetailsDto,
      user: {
        id: userId,
      },
    });
  }

  async addProfilePhotoToDetails(
    userDetailsId: string,
    photo: CreateUserPhotoDto,
  ) {
    const foundDetails = await this.findUserDetailsById(userDetailsId);

    console.log('dobivame slika', photo.profilePhoto);

    const newDetails: UserDetails = {
      ...foundDetails,
      profilePhoto: photo.profilePhoto,
    };

    console.log(newDetails.profilePhoto);

    await this.usersDetailsRepo.save(newDetails);
  }

  findAllUserDetails() {
    return this.usersDetailsRepo.find({ loadRelationIds: true });
  }

  async findUserDetailsById(id: string) {
    try {
      const foundUserDetails = await this.usersDetailsRepo.findOneByOrFail({
        id,
      });

      return foundUserDetails;
    } catch (error) {
      throw new NotFoundException('User details not found');
    }
  }

  async updateUserDetails(id: string, updateUserDetails: UpdateUserDetailsDto) {
    const foundUserDetails = await this.findUserDetailsById(id);

    Object.assign(foundUserDetails, updateUserDetails);

    await this.usersDetailsRepo.save(foundUserDetails);
  }

  async deleteUserDetails(id: string) {
    const foundUserDetails = await this.findUserDetailsById(id);

    await this.usersDetailsRepo.remove(foundUserDetails);
  }
}
