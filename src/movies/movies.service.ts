import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private repo: Repository<Movie>) {}

  async create(dto: CreateMovieDto, file: Express.Multer.File) {
  const allMovies = await this.repo.find();

  const alreadyExists = allMovies?.some(
    movie => movie?.movie_title?.toLowerCase() === dto?.movie_title?.toLowerCase()
  );

  if (alreadyExists) {
    throw new ConflictException(`Movie "${dto.movie_title}" already exists`);
  }

  const movie = this.repo.create({
    ...dto,
    movie_image: file?.filename || '',
  });

  return this.repo.save(movie);
}

async replace(id: number, attrs: CreateMovieDto, file: Express.Multer.File) {
  const movie = await this.repo.findOneBy({ id });
  if (!movie) throw new NotFoundException('Movie not found');

  movie.movie_title = attrs.movie_title;
  movie.movie_publishing_year = attrs.movie_publishing_year;
  movie.movie_image = file.filename;

  console.log("movie", movie, attrs, file)
  return this.repo.save(movie);
}

async delete(id: number) {
  const movie = await this.repo.findOneBy({ id });
  if (!movie) {
    throw new NotFoundException('Movie not found');
  }

  await this.repo.remove(movie);
  return movie.movie_title;
}

async getOne(id: number) {
  const movie = await this.repo.findOneBy({ id });

  if (!movie) {
    throw new NotFoundException('Movie not found');
  }

  return movie;
}

async getAll(page = 1, limit = 10) {
  const [data, total] = await this.repo.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { id: 'DESC' },
  });

  return {
    total,
    page,
    limit,
    data,
  };
}
}