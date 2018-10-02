export default class View {

  showOrHide(response) {
    const resultSuccess = document.querySelector('.result .success');
    const resultReject = document.querySelector('.result .reject');
    const progress = document.querySelector('#progress');

    if (response === 'pending') {
      resultReject.classList.add('hide');
      resultSuccess.classList.add('hide');
      progress.classList.remove('hide');
    }

    if (response === 'resolve') {
      resultReject.classList.add('hide');
      resultSuccess.classList.remove('hide');
      progress.classList.add('hide');
    }
    if (response === 'reject') {
      resultSuccess.classList.add('hide');
      resultReject.classList.remove('hide');
      progress.classList.add('hide');
    }
  }
  // -------------------------------- END ---------------------------------

  // check the status of the response from the server
  isState(state) {
    // const progress = document.querySelector('#progress');

    if (state) {
      // progress.classList.add('hide');
      this.showOrHide('resolve');
    } else {
      this.showOrHide('pending');
    }
  }

  // create new table on result data
  createNewTableOnResultData(data) {
    const progress = document.querySelector('#progress');
    const tableBody = document.querySelector('.table tbody');
    const searchInput = document.querySelector('.search__input');

    progress.classList.add('hide');

    if (!data.length) {
     this.showOrHide('reject');
     searchInput.placeholder = 'Type your request...'
    }

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

  // The function of sorting rows by rating or by name
  _patternSorting(colNum, type, upDown) {
    const table = document.querySelector('.table');
    const tableBody = document.querySelector('.table tbody');
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
  toggleHtmlClassForSortedRow(type, cellIndex) {
    const table = document.querySelector('.table');

    if (table.querySelector(`[data-type=${type}]`).classList.contains('sorted-up')) {
      table.querySelector(`[data-type=${type}]`).classList.remove('sorted-up');
      table.querySelector(`[data-type=${type}]`).classList.add('sorted-down');

      return this._patternSorting(cellIndex, type, 'down');
    }

    table.querySelector(`[data-type=${type}]`).classList.remove('sorted-down');
    table.querySelector(`[data-type=${type}]`).classList.add('sorted-up');
    table.querySelector(`[data-type=${(type === 'number') ? 'string' : 'number'}]`).classList.remove('sorted-down');
    table.querySelector(`[data-type=${(type === 'number') ? 'string' : 'number'}]`).classList.remove('sorted-up');

    return this._patternSorting(cellIndex, type, 'up');
  }
  // -------------------------------- END ---------------------------------

  // Setting values in the modal window with additional info about the show
  setValueInModal(data, id) {
    const modalImg = document.querySelector('.modal__img');
    const modalContent = document.querySelector('.modal__content');

    // clear modal info
    modalContent.innerHTML = '';

    for (let i = 0; i < Object.keys(data).length; i++) {
      if (data[i].show.id === +id) {
        modalImg.src = data[i].show.image
          ? data[i].show.image.medium : 'https://via.placeholder.com/178x250';

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
}
