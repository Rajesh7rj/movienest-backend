import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Param,
  ParseIntPipe,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { multerConfig } from './multer.config';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateMovieDto } from './dto/update-movie.dto';

@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly service: MoviesService) {}

  @Post('create-movie')
  @UseInterceptors(FileInterceptor('movie_image', multerConfig))
  async create(
    @Body() dto: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Movie Image is required.');
    }

    const createdMovie = await this.service.create(dto, file);

    return {
      message: `Movie '${createdMovie.movie_title}' created successfully`,
      data: createdMovie,
    };
  }

 @Put('update-movie/:id')
@UseInterceptors(FileInterceptor('movie_image', multerConfig))
async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateMovieDto,
  @UploadedFile() file?: Express.Multer.File,
) {
  if (!dto.movie_title && !dto.movie_publishing_year && !file) {
    throw new BadRequestException('At least one field must be provided to update.');
  }

  const updatedMovie = await this.service.updateFields(id, dto, file);

  return {
    message: `Movie '${updatedMovie.movie_title}' updated successfully`,
    data: updatedMovie,
  };
}

  @Delete('delete-movie/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deletedTitle = await this.service.delete(id);

    return {
      message: `Movie '${deletedTitle}' deleted successfully`,
    };
  }

  @Get('get-movie-by-id/:id')
  async getMovie(@Param('id', ParseIntPipe) id: number) {
    const movie = await this.service.getOne(id);

    return {
      message: `Movie '${movie.movie_title}' fetched successfully`,
      data: movie,
    };
  }

  @Get('get-movies')
  async getAllMovies(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const result = await this.service.getAll(pageNum, limitNum);

    return {
      message: 'Movies fetched successfully',
      ...result,
    };
  }
}
