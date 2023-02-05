/**
 * @jest-environment jsdom
 */

import * as main from '../movieApp';
import { IMovie } from '../models/Movie';
import { body } from './html';

let movieList: IMovie[] = [
  {  
    Title: 'A new hope',
    imdbID: 'IV',
    Type: 'string',
    Poster: 'https://url-a-new.jpg',
    Year: 'string'
  }, 
  {  
    Title: 'The empire strikes back',
    imdbID: 'V',
    Type: 'string',
    Poster: 'https://url-the-empire.jpg',
    Year: 'string'
  }, 
  {
    Title: 'Return of the Jedi',
    imdbID: 'VI',
    Type: 'string',
    Poster: 'https://url-return-of.jpg',
    Year: 'string'
  }];
  

describe('tests for HTML manipulation', () => {

beforeEach(() => {
  document.body.innerHTML = '';
  document.body.innerHTML = body;
});

  test('createHtml should add HTML correctly', () => {
    let container: HTMLDivElement = document.querySelector('#movie-container') as HTMLDivElement;

    main.createHtml(movieList, container);

    let divElements: NodeListOf<Element> = document.querySelectorAll('.movie');
    let h3Elements: NodeListOf<Element> = document.querySelectorAll('.title');
    let imgElements: NodeListOf<Element> = document.querySelectorAll('#movie-container img');
    let lastImgElement: HTMLImageElement = imgElements[imgElements.length - 1] as HTMLImageElement;

    expect(divElements.length).toBe(3);
    for (let i = 0; i <h3Elements.length; i++) {
      expect(h3Elements[i].innerHTML).toBe(movieList[i].Title);
    }
    expect(lastImgElement.src).toBe('https://url-return-of.jpg/') // vart läggs detta slash till? 😮 konkateneras alltid ett slash till src-attribut?
  })

})