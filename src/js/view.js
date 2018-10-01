export default class View {
  constructor() {
    // this.request = '';
  }

  getModalData(modalData) {
    return this.resultData = modalData;
  }

  isState(state) {
    const progress = document.querySelector('#progress');
    const resultSuccess = document.querySelector('.result .success');
    const resultReject = document.querySelector('.result .reject');

    if (state) {
      progress.classList.add('hide');
      showOrHide('resolve');
    } else {
      showOrHide('reject');
      // progress.classList.remove('hide');
    }

    function showOrHide(response) {
      if (response === 'resolve') {
        resultReject.classList.add('hide');
        resultSuccess.classList.remove('hide');
      }
      if (response === 'reject') {
        resultSuccess.classList.add('hide');
        resultReject.classList.remove('hide');
      }
    }
  }

  // create new table on result data

  createNewTableOnResultData(data) {
    console.log(data);
    console.log('-----dada-----');

    const tableBody = document.querySelector('.table tbody');
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
}
