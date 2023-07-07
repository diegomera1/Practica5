import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prestamo } from './prestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';

@Injectable()
export class PrestamoService {
  private readonly logger = new Logger('PrestamoService');

  constructor(
    @InjectRepository(Prestamo)
    private readonly prestamoRepository: Repository<Prestamo>,
  ) {}

  async create(createGasolineDto: CreatePrestamoDto): Promise<Prestamo> {
    try {
      const prestamo = this.prestamoRepository.create(createGasolineDto);
      await this.prestamoRepository.save(prestamo);
      return prestamo;
    } catch (error) {
      console.error(error);
      if (error.code === '23505') throw new BadRequestException(error.detail);
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating gasoline');
    }
  }

  async findAll(): Promise<Prestamo[]> {
    return await this.prestamoRepository.find({});
  }

  async findOne(id: string): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOneBy({ id });
    if (!prestamo) throw new NotFoundException(`Prestamo ${id} not found`);
    return prestamo;
  }

  async findOneByName(name: string): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOneBy({ name });
    if (!prestamo) throw new NotFoundException(`Prestamo ${name} not found`);
    return prestamo;
  }

  async update(
    id: string,
    updatePrestamoDto: UpdatePrestamoDto,
  ): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.preload({
      id: id,
      ...updatePrestamoDto,
    });
    if (!prestamo) throw new NotFoundException(`Prestamo ${id} not found`);

    try {
      await this.prestamoRepository.save(prestamo);
      return prestamo;
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: string): Promise<void> {
    const gasoline = await this.findOne(id);
    await this.prestamoRepository.remove(gasoline);
  }
}
