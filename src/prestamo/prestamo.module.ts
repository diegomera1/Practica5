import { Module } from '@nestjs/common';
import { PrestamoController } from './prestamo.controller';
import { PrestamoService } from './prestamo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestamo } from './prestamo.entity';

@Module({
  controllers: [PrestamoController],
  imports: [TypeOrmModule.forFeature([Prestamo])],
  providers: [PrestamoService],
  exports: [PrestamoService, TypeOrmModule],
})
export class PrestamoModule {}
