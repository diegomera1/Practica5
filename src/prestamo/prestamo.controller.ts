import {
  Body,
  Controller,
  Post,
  Get,
  ParseUUIDPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';

@Controller('prestamo')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) {}

  @Post()
  create(@Body() createPrestamoDto: CreatePrestamoDto) {
    return this.prestamoService.create(createPrestamoDto);
  }

  @Get()
  findAll() {
    return this.prestamoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.prestamoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePrestamoDto: UpdatePrestamoDto,
  ) {
    return this.prestamoService.update(id, updatePrestamoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.prestamoService.remove(id);
  }
}
