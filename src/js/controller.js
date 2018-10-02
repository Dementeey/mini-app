export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this._modelData = [];
    this._getRequest();
    this._initEvent();
    this._getProcessingResponse('girls');
  }

  _getRequest() {
    const searchInput = document.querySelector('.search__input');
    const searchBtn = document.querySelector('.search__btn');

    searchInput.addEventListener('input', debounce(this._getProcessingResponse.bind(this), 300));
    searchBtn.addEventListener('click', this._getProcessingResponse.bind(this));
    searchInput.addEventListener('keydown', e => {
      // e.keyCode === 13 - Enter
      if (e.keyCode === 13) {
        e.preventDefault();
        this._getProcessingResponse.bind(this);
      }
    });

    function debounce(func, ms) {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(), ms)
      }
    }
  }
  // -------------------------------- END ---------------------------------

  _getProcessingResponse(setQuery) {
    const searchInput = document.querySelector('.search__input');

    this.view.showOrHide('pending');

    if (!setQuery && !searchInput.value) {
      setQuery = '';
    }
    if (searchInput.value) {
      setQuery = searchInput.value;
    }
    if (typeof setQuery !== "string") {
      setQuery = '';
    }

    this.model.getFetch(setQuery)
      .then(r => r.json())
      .then(r => {

        if (!r.length) {
          this.model.state = false;
        }

        this.model.state = true;
        this._modelData = r;
        this.view.isState(this.model.state);
        return this.view.createNewTableOnResultData(r);
      });
  }

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
        this.view.setValueInModal(this._modelData, target.parentElement.getAttribute('data-id'));
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
