import { IMovie } from "../../models/Movie";

export let mockList: IMovie[] = [
  {  
    Title: 'Star wars - A new hope',
    imdbID: 'IV',
    Type: 'string',
    Poster: 'https://url-a-new.jpg',
    Year: '1977'
  }, 
  {  
    Title: 'Star wars - The empire strikes back',
    imdbID: 'V',
    Type: 'string',
    Poster: 'https://url-the-empire.jpg',
    Year: '1980'
  }];

  export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise((resolve, reject) => {
      if (searchText.length > 0) {
        resolve(mockList);
      }
      else {
        reject([]);
      }
    })

  };
  