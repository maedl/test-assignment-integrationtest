import { getData } from "../services/movieservice";
import { mockList } from "../services/__mocks__/movieservice";

jest.mock('axios', () => ({
  get: async (url: string) => {
    return new Promise ((resolve, reject) => {
      if (url.endsWith('error')) {
        reject([]);
      }
      else if(url.endsWith('resolve')) {
        resolve ({ data: 
          {
           Search: mockList 
          }
         })
      }
    })
  }
}));

test('should get data correctly', async () => {
  let data = await getData('resolve')

  expect(data[0].Title).toMatch('Star wars - A new hope');
  expect(data[1].Title).toMatch('Star wars - The empire strikes back');
  
});

test('should NOT get data correctly', async () => {
  let data = await getData('error')

  expect(data.length).toBe(0);
});

