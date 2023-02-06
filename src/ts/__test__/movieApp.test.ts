/**
 * @jest-environment jsdom
 */

import * as movieApp from '../movieApp';
import * as movieservice from '../services/movieservice';
import { IMovie } from '../models/Movie';
import { body } from './html';

jest.mock('./../services/movieservice.ts');
  
beforeEach(() => {
  document.body.innerHTML = '';
  document.body.innerHTML = body;
});

describe('tests for HTML manipulation', () => {

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

  test('createHtml should add HTML correctly', () => {
    let container: HTMLDivElement = document.querySelector('#movie-container') as HTMLDivElement;

    movieApp.createHtml(movieList, container);

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

  test('displayNoResult should ad HTML correctly', () => {
    
    let container: HTMLDivElement = document.querySelector('#movie-container') as HTMLDivElement;
    let expectedHtml: string = '<p>Inga sökresultat att visa</p>'
    movieApp.displayNoResult(container);

    expect(container.innerHTML).toMatch(expectedHtml)
  })

})

describe('tests for handleSubmit', () => {

  test('should always clear inner HTML of #movie-container', () => {

    let testHtml: string = '<p>I should not be here after function call</p>';
    let container: HTMLDivElement = document.querySelector('#movie-container') as HTMLDivElement;
    
    container.innerHTML = testHtml;
    let originalInnerHtml: string = container.innerHTML;

    movieApp.handleSubmit();

    expect(originalInnerHtml).toMatch(testHtml);
    expect(container.innerHTML).toMatch('');
  })

  test('should call createHtml', async () => {

    let spy = jest.spyOn(movieApp, 'createHtml').mockReturnValue(); 
    let inputElement: HTMLInputElement = document.querySelector("#searchText") as HTMLInputElement;
    inputElement.value =  'Star wars';

    await movieApp.handleSubmit();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  })

  test('should call displayNoResult', async () => {

    let spy = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();
    let spyOnGetData = jest.spyOn(movieservice, 'getData').mockReturnValue(Promise.resolve([]));
    let inputElement: HTMLInputElement = document.querySelector("#searchText") as HTMLInputElement;
    inputElement.value =  '';

    await movieApp.handleSubmit();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    spyOnGetData.mockRestore();
  })

  
  test('should call getData', async () => {

    let inputElement = (document.querySelector('#searchText') as HTMLInputElement);
    inputElement.value = 'example text';
    let spy = jest.spyOn(movieservice, 'getData');

    movieApp.handleSubmit();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  })
  
})

/*
describe('test for init function', () => {
  
  test('test for init function', () => {
    
    })

})

*/