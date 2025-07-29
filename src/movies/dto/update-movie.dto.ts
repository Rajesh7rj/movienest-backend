// src/movies/dto/update-movie.dto.ts

import { IsOptional, IsString, IsNumber, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  movie_title?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'movie_publishing_year must be a number' })
  movie_publishing_year?: number;
}
