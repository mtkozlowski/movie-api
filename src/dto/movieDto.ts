import { IsDate, IsString } from 'class-validator';

export class MovieDto {
  constructor(
    title: string,
    released: string,
    genre: string,
    director: string,
  ) {
    this.title = title;
    this.released = new Date(released || 0);
    this.genre = genre || this.notAvailableFieldValue;
    this.director = director || this.notAvailableFieldValue;
  }

  private readonly notAvailableFieldValue: string = 'N/A';

  @IsString()
  title: string;

  @IsDate()
  released: Date;

  @IsString()
  genre: string;

  @IsString()
  director: string;
}
