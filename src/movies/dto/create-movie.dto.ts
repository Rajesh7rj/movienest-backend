import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({ message: 'Movie title is required' })
  movie_title?: string;

  @IsNotEmpty({ message: 'Publishing year is required' })
  movie_publishing_year?: number;
  movie_image: string | undefined;
}
