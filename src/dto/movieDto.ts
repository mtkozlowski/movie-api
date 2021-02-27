export class MovieDto {
  constructor(newMovie: any) {
    this.Title = newMovie.Title;
    this.Released = new Date(newMovie.Released);
    this.Genre = newMovie.Genre;
    this.Directory = newMovie.Director;
  }

  Title: string;
  Released: Date;
  Genre: string;
  Directory: string;
}
