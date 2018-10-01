export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this._getRequest();
    this._initEvent();
    this.view.createNewTableOnResultData(
      this.model.getFetch('girls'));
  }

  // TODO -- повесить _debounce после настройки получения данных вовремя
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
  // -------------------------------- END ---------------------------------

  _getRequest() {
    const searchInput = document.querySelector('.search__input');
    const searchBtn = document.querySelector('.search__btn');

    searchInput.addEventListener('input', getProcessingResponse.bind(this));
    searchBtn.addEventListener('click', getProcessingResponse.bind(this));
    searchInput.addEventListener('keydown', e => {
      // e.keyCode === 13 - Enter
      if (e.keyCode === 13) {
        e.preventDefault();
        getProcessingResponse.call(this);
      }
    });

    function getProcessingResponse() {
      this.view.createNewTableOnResultData(
        this.model.getFetch(searchInput.value));
      this.view.isState(this.model.state);
      return searchInput.value;
    }
  }
  // -------------------------------- END ---------------------------------

  _initEvent() {
    const table = document.querySelector('.table');
    const modalRow = document.querySelector('.modal-for-row-data');
    const modalCloseBtn = document.querySelector('.modal__close');
    const modalCloseOverlay = document.querySelector('.modal-for-row-data .overlay');

    // Events on the table by the principle of delegation
    table.addEventListener('click', e => {
      let target = e.target;
      let type = target.getAttribute('data-type');

      if (target.parentElement.classList.contains('table__row-data')) {
        modalRow.classList.remove('hide');
        this.view.setValueInModal(target.parentElement.getAttribute('data-id'));
      }

      if (target.classList.contains('coll-sort')) {
        this.view.toggleHtmlClassForSortedRow(type, target.cellIndex);
      }
    });
    // -------------------------------- END ---------------------------------


    // Events close for the modal window
    modalCloseOverlay.addEventListener('click', () => modalRow.classList.add('hide'));
    modalCloseBtn.addEventListener('click', e => {
      const DELAY_MS = 1300;

      e.target.classList.add('modal__close--active');

      setTimeout(() => {
        e.target.classList.remove('modal__close--active');
        modalRow.classList.add('hide');
      }, DELAY_MS);
    });
    document.addEventListener('keydown', e => {
      // e.keyCode === 27 - Esc
      if (e.keyCode === 27) {
        e.preventDefault();
        modalRow.classList.add('hide');
      }
    });

  }
  // -------------------------------- END ---------------------------------
}
