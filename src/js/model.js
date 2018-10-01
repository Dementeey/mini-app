export default class Model {
  constructor() {
    this._resultData = [];
    this.state = true;
  }

  getFetch(query = 'girls') {
    fetch(`http://api.tvmaze.com/search/shows?q=${query}`)
      .then(r => r.json())
      .then(r => {
        if (!r.length) {
          return this.state = false;
        }
        this.state = true;
        this._resultData = r;
      })
      .catch(() => this.state = false);
    return this._resultData;
 }
}

