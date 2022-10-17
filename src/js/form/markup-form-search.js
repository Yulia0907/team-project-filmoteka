function markupFormListSearch(resultSearch) {
  // console.log('------markupFormListSearch------');
  // console.log('input data: ', resultSearch);
  const newItem = preapreArray(resultSearch);
  // console.log('new Item: ', newItem);
  return markupResSearch(newItem);
}

function markupGalleryNameSearch(itemSearch) {
  //
}

const preapreArray = item => {
  // console.log('------preapreArray------');
  // console.log('iem: ', item);
  // console.log('preapreArray item:  ', item);
  const newArr = item.map(evt => {
    let { title = '', vote_average = '', release_date = '', id = '' } = evt;
    // let { title, vote_average, release_date, id } = evt;
    // console.log('index : ', index, '       release_date: ', release_date);
    release_date.length > 0 ? (release_date = release_date.slice(0, 4)) : '';
    return { title, vote_average, release_date, id };
  });
  // console.log('newArr: ', newArr);

  return newArr;
};

const markupResSearch = card => card.map(markupResultSearchTPL).join('');

const markupResultSearchTPL = ({ title, release_date, id }, index, Arr) => {
  return `
      <div class="search-result__item " tadindex="0" data-index=${index} data-id=${id}>
        <p class="search-result__title">${title}</p>
        <span class="search-result__date"> (${release_date})</span>
      </div>
      `;
};

export { markupFormListSearch };
