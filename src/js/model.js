export default class Model {
  constructor(query = 'girls') {
    this.query = query;
    this._resultData = [];
  }

  // setQuery(setQuery) {
  //   return this.query = setQuery;
  // }


  get resultData() {
    return this._resultData;
  }

  getFetch() {
    return fetch(`http://api.tvmaze.com/search/shows?q=${this.query}`)
      .then(r => r.json())
      .then(r => this._resultData = r)
      .catch((error) => error);
  }
}

