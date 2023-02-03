import * as functions from "../functions";
import { IMovie } from "../models/Movie";

let movieList: IMovie[] = [
  {  
    Title: 'C the movie',
    imdbID: 'string',
    Type: 'string',
    Poster: 'string',
    Year: 'string'
  }, 
  {  
    Title: 'A the movie',
    imdbID: 'string',
    Type: 'string',
    Poster: 'string',
    Year: 'string'
  }, 
  {
    Title: 'B the movie',
    imdbID: 'string',
    Type: 'string',
    Poster: 'string',
    Year: 'string'
  },
  
];

test('should sort movies by title, A-Z', () => {
  functions.movieSort(movieList);

  expect(movieList[0].Title).toBe('A the movie');
  expect(movieList[2].Title).toBe('C the movie');
})

test('should sort movies by title, Z-A', () => {
  functions.movieSort(movieList, false);

  expect(movieList[0].Title).toBe('C the movie');
  expect(movieList[2].Title).toBe('A the movie');
})