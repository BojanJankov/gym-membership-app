import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlansService {
  constructor(@InjectRepository(Plan) private plansRepo: Repository<Plan>) {}

  create(createPlanDto: CreatePlanDto) {
    return this.plansRepo.save(createPlanDto);
  }

  findAll() {
    return this.plansRepo.find({});
  }

  async findOne(id: number) {
    try {
      const foundPlan = await this.plansRepo.findOneByOrFail({ id });

      return foundPlan;
    } catch (error) {
      throw new BadRequestException('Plan not found');
    }
  }

  async update(id: number, updatePlanDto: UpdatePlanDto) {
    const foundPlan = await this.findOne(id);

    Object.assign(foundPlan, updatePlanDto);

    await this.plansRepo.save(foundPlan);
  }

  async remove(id: number) {
    const foundPlan = await this.findOne(id);

    await this.plansRepo.remove(foundPlan);
  }
}
