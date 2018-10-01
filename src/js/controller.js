export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.saveRequest = '';
    this.getRequest();
    // this.view.createNewTableOnResultData(this.model.getFetch('girls'));
  }

  _debounce(f, ms) {
    let timer = null;

    return function (...args) {
      const onComplete = () => {
        f.apply(this, args);
        timer = null;
      };

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(onComplete, ms);
    };
  }

  getRequest() {
    const searchInput = document.querySelector('.search__input');
    searchInput.addEventListener('input', ()=> {
      console.log('Запрос в поиске сейчас ' + searchInput.value);
      // console.log(this.model.getFetch(searchInput.value));
      this.saveRequest = searchInput.value;
      searchInput.placeholder = `Last request: ${this.saveRequest}`;
      this.view.createNewTableOnResultData(this.model.getFetch(searchInput.value));
      this.view.isState(this.model.state);
      return searchInput.value;
    });
  }
}
