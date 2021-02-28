export class MovieDto {
  constructor(
    title: string,
    released: string,
    genre: string,
    director: string,
  ) {
    this.title = title;
    this.released = new Date(released);
    this.genre = genre;
    this.director = director;
  }

  title: string;
  released: Date;
  genre: string;
  director: string;
}
