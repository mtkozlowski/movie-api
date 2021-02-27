export class Movie {
  Title: string;
  Released: Date;
  Genre: string;
  Directory: string;

  constructor(newMovie: any) {
    this.Title = newMovie.Title;
    this.Released = new Date(newMovie.Released);
    this.Genre = newMovie.Genre;
    this.Directory = newMovie.Director;
  }
}
