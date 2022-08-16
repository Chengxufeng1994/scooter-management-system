import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { ScooterInterface } from './interfaces/scooter.interface';

@Injectable()
export class ScooterService {
  constructor(
    @Inject('SCOOTER_REPOSITORY')
    private scooterRepository: Repository<ScooterInterface>,
  ) {}

  async create(
    createScooterDto: CreateScooterDto,
  ): Promise<ScooterInterface | null> {
    const { license } = createScooterDto;
    const existingScooter = await this.scooterRepository.findOne({
      where: { license },
    });

    if (existingScooter !== null) {
      throw new BadRequestException('License in use');
    }

    const scooter = this.scooterRepository.create(createScooterDto);

    return this.scooterRepository.save(scooter);
  }

  findAll(): Promise<ScooterInterface[]> {
    return this.scooterRepository.find();
  }

  findOneById(id: number): Promise<ScooterInterface | null> {
    return this.scooterRepository.findOne({ where: { id } });
  }

  async update(id: number, updateScooterDto: UpdateScooterDto) {
    const existingScooter = await this.scooterRepository.findOneBy({
      id,
    });

    if (!existingScooter) {
      throw new BadRequestException('Scooter not found');
    }

    return await this.scooterRepository.update(id, updateScooterDto);
  }

  async remove(id: number) {
    const existingScooter = await this.scooterRepository.findOneBy({
      id,
    });

    if (!existingScooter) {
      throw new BadRequestException('Scooter not found');
    }

    return await this.scooterRepository.remove(existingScooter);
  }
}
