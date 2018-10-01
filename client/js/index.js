// DOM
const app = document.querySelector('#app');
const table = app.querySelector('.table');
const tableBody = app.querySelector('.table tbody');
const modalRow = app.querySelector('.modal-for-row-data');
const modalCloseBtn = app.querySelector('.modal__close');
const modalCloseOverlay =
  app.querySelector('.modal-for-row-data .overlay');
const searchInput = app.querySelector('.search__input');
const searchBtn = app.querySelector('.search__btn');
const resultSuccess = app.querySelector('.result .success');
const resultReject = app.querySelector('.result .reject');
const progress = app.querySelector('#progress');
// -------------------------------- END ---------------------------------


// TODO ----- загрузка при удалениее данных с полля ввода по апи http://api.tvmaze.com/schedule/full


// Global Variables
const API_SHOW_QUERY = 'http://api.tvmaze.com/search/shows?q=';
// const API_SHOW_FULL_LIST = 'http://api.tvmaze.com/schedule/full';


let request;
let resultData;
// -------------------------------- END ---------------------------------


// Initializing the first load with a query "girls"
firstLoadedRequest('girls');
// -------------------------------- END ---------------------------------

// Initializing all event
initEvent();
// -------------------------------- END ---------------------------------


function debounce(f, ms) {
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


// Create new table on result data
function createNewTableOnResultData(data) {
  tableBody.innerHTML= '<tr></tr>';

  for (let i = 0; i < 5; i += 1) {
    const newTH = document.createElement('th');

    switch (i) {
      case 0:
        newTH.classList.add('coll-sort');
        newTH.setAttribute('data-type', 'string');
        newTH.innerText = 'Show name';
        break;
      case 1:
        newTH.innerText = 'Language';
        break;
      case 2:
        newTH.innerText = 'Genres';
        break;
      case 3:
        newTH.innerText = 'Status of show';
        break;
      case 4:
        newTH.classList.add('coll-sort');
        newTH.setAttribute('data-type', 'number');
        newTH.innerText = 'Rating';
        break;

      default:
        break;
    }

    tableBody.firstElementChild.appendChild(newTH);
  }

  for (let i = 0; i < Object.keys(data).length; i += 1) {
    const newTR = document.createElement('tr');
    newTR.classList.add('table__row-data');
    newTR.setAttribute('data-id', `${data[i].show.id}`);

    tableBody.appendChild(newTR);

    for (let j = 0; j < 5; j += 1) {
      const newTD = document.createElement('td');

      switch (j) {
        case 0:
          newTD.innerText = data[i].show.name;
          break;
        case 1:
          newTD.innerText = data[i].show.language;
          break;
        case 2:
          newTD.innerText = data[i].show.genres.length
            ? data[i].show.genres.join(', ') : '-';
          break;
        case 3:
          newTD.innerText = data[i].show.status;
          break;
        case 4:
          newTD.innerText = data[i].show.rating.average
            ? data[i].show.rating.average : 0;
          break;

        default:
          break;
      }
      newTR.appendChild(newTD);
    }
  }
}
// -------------------------------- END ---------------------------------


// Receiving and processing response get request
function getProcessingResponse(value = request, url = API_SHOW_QUERY) {
  if (!value) {
    value = '';

    // wraperForFetch(API_SHOW_FULL_LIST, value);
    // return;
  }
  wraperForFetch(url, value);

  function wraperForFetch(url, value) {
    fetch(`${url}${value}`)
      .then(r => r.json())
      .then(r => {
        document.querySelector('#progress').classList.add('hide');

        if (r.length) {
          showOrHide('reject');
          resultData = r;
          return createNewTableOnResultData(r);
        }

        showOrHide('resolve');
      })
      .catch(() => {
        progress.classList.remove('hide');
      });
  }

  function showOrHide(response) {
    if (response === 'resolve') {
      resultReject.classList.remove('hide');
      resultSuccess.classList.add('hide');
    }
    if (response === 'reject') {
      resultSuccess.classList.remove('hide');
      resultReject.classList.add('hide');
    }
  }
}
// -------------------------------- END ---------------------------------


// First load, before the result is entered
function firstLoadedRequest(str) {
  // if (request === undefined) {
  if (!request) {
    getProcessingResponse(str);
  }
}
// -------------------------------- END ---------------------------------


// Setting values in the modal window with additional info about the show
function setValueInModal(data, id) {
  const modalImg = app.querySelector('.modal__img');
  const modalContent = app.querySelector('.modal__content');

  // clear modal info
  modalContent.innerHTML = '';

  for (let i = 0; i < Object.keys(data).length; i++) {
    if (data[i].show.id === +id) {
      modalImg.src = data[i].show.image
        ? data[i].show.image.medium :'https://via.placeholder.com/178x250';
      modalContent.innerHTML = `
      <div class="genres">Genres:
        ${data[i].show.genres.length ? data[i].show.genres.join(' | ') : '-'}
      </div>
      <div class="language">Language:
        ${data[i].show.language ? data[i].show.language : '-'}
      </div>
      <div class="name">Name:
        ${data[i].show.name ? data[i].show.name : '-'}
      </div>
      <div class="officalSite">Official Site: 
        <a href="${data[i].show.officialSite}" target="_blank">
          ${data[i].show.officialSite ? data[i].show.officialSite : ''}
        </a>
      </div>
      <div class="premiered">Premiered:
        ${data[i].show.premiered ? data[i].show.premiered : '-'}
      </div>
      <div class="rating">Rating:
        ${data[i].show.rating.average ? data[i].show.rating.average : '-'}
      </div>
      <div class="runtime">Runtime:
        ${data[i].show.runtime ? data[i].show.runtime : '-'} min
      </div>
      <div class="schedule">Schedule:
        <span class="days">
          ${data[i].show.schedule.days[0] ? data[i].show.schedule.days[0] : '-'}
        </span>
        <span class="Time">
           at (${data[i].show.schedule.time ? data[i].show.schedule.time : '-'})
        </span>
      </div>
      <div class="status">Status:
        ${data[i].show.status ? data[i].show.status : '-'}
      </div>
      <div class="type">Type:
        ${data[i].show.type ? data[i].show.type : '-'}
      </div>
      <div class="summary">Summary:
        ${data[i].show.summary ? data[i].show.summary : '-'}
      </div>
     `;
    }
  }
}
// -------------------------------- END ---------------------------------


// The function of sorting rows by rating or by name
function patternSorting(colNum, type, upDown) {
  let tbody = table.getElementsByTagName('tbody')[0];
  let rowsArray = [].slice.call(tableBody.rows, 1);
  let compare;

  if (upDown === 'up') {
    switch (type) {
      case 'number':
        compare = function(rowA, rowB) {
          return rowB.cells[colNum].innerHTML - rowA.cells[colNum].innerHTML;
        };
        break;
      case 'string':
        compare = function(rowA, rowB) {
          return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML;
        };
        break;
    }
  }

  if (upDown === 'down') {
    switch (type) {
      case 'number':
        compare = function(rowA, rowB) {
          return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
        };
        break;
      case 'string':
        compare = function(rowA, rowB) {
          return rowA.cells[colNum].innerHTML < rowB.cells[colNum].innerHTML;
        };
        break;
    }
  }

  rowsArray.sort(compare);
  table.removeChild(tbody);

  for (let i = 0; i < rowsArray.length; i++) {
    tbody.appendChild(rowsArray[i]);
  }

  table.appendChild(tbody);
}
// -------------------------------- END ---------------------------------


// Function to switch classes to html, and sort calls
function toggleHtmlClassForSortedRow(type, cellIndex) {
  if (table.querySelector(`[data-type=${type}]`).classList.contains('sorted-up')) {
    table.querySelector(`[data-type=${type}]`).classList.remove('sorted-up');
    table.querySelector(`[data-type=${type}]`).classList.add('sorted-down');

    return patternSorting(cellIndex, type, 'down');
  }

  table.querySelector(`[data-type=${type}]`).classList.remove('sorted-down');
  table.querySelector(`[data-type=${type}]`).classList.add('sorted-up');
  table.querySelector(`[data-type=${(type === 'number') ? 'string' : 'number'}]`).classList.remove('sorted-down');
  table.querySelector(`[data-type=${(type === 'number') ? 'string' : 'number'}]`).classList.remove('sorted-up');

  return patternSorting(cellIndex, type, 'up');
}
// -------------------------------- END ---------------------------------


function initEvent() {
  // Custom Search Events
  if (!request) {
    request = ' ';
  }

  searchBtn.addEventListener('click', () => {
    return getProcessingResponse(request);
  });

  searchInput.addEventListener('keydown', e => {
    const codeKey = e.keyCode || e.key || e.which;
    if (codeKey === 13) {
      e.preventDefault();
      getProcessingResponse(request);
    }
  });

  searchInput.addEventListener('input', debounce(() => {
    let saveRequest = request;

    request = searchInput.value;
    searchInput.placeholder = `Last request: ${saveRequest}`;
    getProcessingResponse();
  }, 200));
  // -------------------------------- END ---------------------------------


  // Events on the table by the principle of delegation

  table.addEventListener('click', e => {
    let target = e.target;
    let type = target.getAttribute('data-type');

    if (target.parentElement.classList.contains('table__row-data')) {
      modalRow.classList.remove('hide');
      setValueInModal(resultData, target.parentElement.getAttribute('data-id'));
    }

    if (target.classList.contains('coll-sort')) {
      toggleHtmlClassForSortedRow(type, target.cellIndex);
    }
  });
  // -------------------------------- END ---------------------------------


  // Events for the modal window

  modalCloseOverlay.addEventListener('click', () => modalRow.classList.add('hide'));

  modalCloseBtn.addEventListener('click', e => {
    const DELAY_MS = 1300;

    e.target.classList.add('modal__close--active');

    setTimeout(() => {
      e.target.classList.remove('modal__close--active');
      modalRow.classList.add('hide');
    }, DELAY_MS);
  });

  // close by ESC
  document.addEventListener('keydown', e => {
    const codeKey = e.keyCode || e.key || e.which;

    if (codeKey === 27 || codeKey === 'Escape') {
      e.preventDefault();
      modalRow.classList.add('hide');
    }
  });
  // -------------------------------- END ---------------------------------

}
// -------------------------------- END ---------------------------------

