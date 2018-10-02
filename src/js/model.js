export default class Model {
  constructor() {
    this.state = false;
  }

  getFetch(query = 'girls') {
   return fetch(`http://api.tvmaze.com/search/shows?q=${query}`)
      .then(r => r)
      .catch(() => this.state = false);
 }
}

