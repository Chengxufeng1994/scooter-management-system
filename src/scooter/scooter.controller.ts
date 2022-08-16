import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ScooterService } from './scooter.service';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { ScooterInterface } from './interfaces/scooter.interface';
import { Scooter } from './entities/scooter.entity';

@Controller('scooter')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Post()
  @ApiOkResponse({ status: 201, type: Scooter })
  async create(
    @Body() createScooterDto: CreateScooterDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const scooter = await this.scooterService.create(createScooterDto);
      res.status(HttpStatus.CREATED).send(scooter);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOkResponse({ status: 200, type: Scooter, isArray: true })
  async findAll(@Req() request: Request, @Res() res: Response) {
    const scooters: Array<ScooterInterface> =
      await this.scooterService.findAll();

    res.status(HttpStatus.OK).json(scooters);
  }

  @Get(':id')
  @ApiOkResponse({ status: 200, type: Scooter })
  async findOneById(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const scooter = await this.scooterService.findOneById(+id);
    res.status(HttpStatus.OK).send(scooter);
  }

  @Put(':id')
  @ApiOkResponse({ status: 200, type: Scooter })
  async update(
    @Param('id') id: string,
    @Body() updateScooterDto: UpdateScooterDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const scooter = await this.scooterService.update(+id, updateScooterDto);
      res.status(HttpStatus.OK).send(scooter);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.scooterService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
