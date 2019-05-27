import marvelApi from '../configs/configs';
const marvelURL = 'https://gateway.marvel.com/v1/public/',
  apiKey = `apikey=${marvelApi.publicKey}`,
  ts = `ts=${marvelApi.ts}`,
  hash = `hash=${marvelApi.hash}`;

const getMarvelCharacters = (options) => {
  const {
    offset,
    name,
    exactMatch,
    sortName,
    limit,
  } = Object.assign({
    offset: 0,
    name: '',
    exactMatch: false,
    sortName: '',
    limit: 20,
  }, options);

  let url = `${marvelURL}characters?${apiKey}&offset=${offset}&orderBy=${sortName}name&limit=${limit}&${ts}&${hash}`;
  if (name) {
    if (exactMatch) {
      url += `&name=${name}`;
    } else {
      url += `&nameStartsWith=${name}`;
    }
  }
  return fetch(url)
    .then(res => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === 200) {
          if (offset > resObj.data.total) {
            throw new Error('Page does not exist.');
          } else {
            const pages = Math.floor(resObj.data.total / limit);
            return {
              characters: resObj.data.results,
              maxPage: resObj.data.total % limit > 0 ? pages + 1 : pages,
              total: resObj.data.total,
            };
          }
        } else {
          throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
        }
      } catch (e) {
        console.error(e);
        return {
          characters: [],
          maxPage: 0,
        };
      }
    });
}

const getMarvelComics = (options) => {
  const {
    characterId
  } = Object.assign({
    characterId: ''
  }, options);

  let url = `${marvelURL}characters/${characterId}/comics?${apiKey}&${ts}&${hash}`;
  return fetch(url)
    .then(res => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === 200) {
          return {
            comics: resObj.data.results,
          };
        } else {
          throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
        }
      } catch (e) {
        // console.error(e);
        return {
          comics: [],
        };
      }
    });
};

export {
  getMarvelCharacters,
  getMarvelComics
};