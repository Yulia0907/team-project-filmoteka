function markupFormSearch(resultSearch) {
  const newItem = preapreArray(resultSearch);
  console.log('new Item: ', newItem);
  return markupResSearch(newItem);
}

const preapreArray = item => {
  console.log(item);
  const newArr = item.map(evt => {
    let { title, vote_average, release_date } = evt;
    release_date.length > 0 ? (release_date = release_date.slice(0, 4)) : '';
    return { title, vote_average, release_date };
  });
  console.log('newArr: ', newArr);

  return newArr;
};

const markupResSearch = card => card.map(markupResultSearchTPL).join('');

const markupResultSearchTPL = ({ title, release_date }, index, Arr) => {
  return `
      <div class="search-result__item" tadindex="0" data-index=${index}>
        <p class="search-result__title">${title}</p>
        <p class="search-result__date">${release_date}</p>

      </div>
      `;
};

export { markupFormSearch };
