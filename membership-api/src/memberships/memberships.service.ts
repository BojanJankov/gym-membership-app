import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private membershipRepo: Repository<Membership>,
  ) {}

  async create(createMembershipDto: CreateMembershipDto) {
    console.log('from create', createMembershipDto);
    return await this.membershipRepo.save({
      ...createMembershipDto,
      user: { id: createMembershipDto.userId },
      plan: { id: createMembershipDto.planId },
    });
  }

  findAll() {
    return this.membershipRepo.find({
      relations: {
        plan: true,
        user: true,
      },
      select: {
        user: {
          firstName: true,
          lastName: true,
          username: true,
          email: true,
        },
      },
    });
  }

  async findOne(id: number) {
    try {
      const foundMembership = await this.membershipRepo.findOneByOrFail({ id });

      return foundMembership;
    } catch (error) {
      throw new BadRequestException('Membership Not Found');
    }
  }

  async findMembershipsByUserId(userId: string) {
    const memberships = await this.membershipRepo.find({
      relations: {
        user: true,
        plan: true,
      },
      where: {
        user: { id: userId },
      },
    });

    console.log(memberships);

    return memberships;
  }

  async update(id: number, updateMembershipDto: UpdateMembershipDto) {
    const foundMembership = await this.findOne(id);

    Object.assign(foundMembership, updateMembershipDto);

    await this.membershipRepo.save(foundMembership);
  }

  async remove(id: number) {
    const foundMembership = await this.findOne(id);

    await this.membershipRepo.remove(foundMembership);
  }
}
