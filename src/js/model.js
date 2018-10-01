export default class Model {
  constructor(query = 'girls') {
    this.query = query;
    this._resultData = [];
    this.state = false;
  }

  // для контролера
  setQuery(setQuery) {
    return this.query = setQuery;
  }

  get resultData() {
    return this._resultData;
  }

  getFetch(query = this.query) {
    fetch(`http://api.tvmaze.com/search/shows?q=${query}`)
      .then(r => r.json())
      .then(r => {
        if (r.length === 0) {
          return this.state = false;
        }
        this.state = true;
        this._resultData = r;
      })
      .catch(() => this.state = false);
    return this._resultData;
}
}

