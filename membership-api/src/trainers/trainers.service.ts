import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainer) private trainersRepo: Repository<Trainer>,
  ) {}
  create(createTrainerDto: CreateTrainerDto) {
    return this.trainersRepo.save(createTrainerDto);
  }

  findAll() {
    return this.trainersRepo.find({});
  }

  async findOne(id: number) {
    try {
      const foundTrainer = await this.trainersRepo.findOneByOrFail({ id });

      return foundTrainer;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: number, updateTrainerDto: UpdateTrainerDto) {
    const foundTrainer = await this.findOne(id);

    Object.assign(foundTrainer, updateTrainerDto);

    await this.trainersRepo.save(foundTrainer);
  }

  async remove(id: number) {
    const foundTrainer = await this.findOne(id);

    await this.trainersRepo.remove(foundTrainer);
  }
}
