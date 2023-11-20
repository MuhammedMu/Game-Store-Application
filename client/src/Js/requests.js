const API_KEY = import.meta.env.VITE_API_KEY;

const requests = [
  // { url: `/games?key=${API_KEY}&dates=2022-01-01,2023-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2021-01-01,2022-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2020-01-01,2021-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2019-01-01,2020-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2018-01-01,2019-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2017-01-01,2018-01-01` },
  { url: `/games?key=${API_KEY}&dates=2016-01-01,2017-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2015-01-01,2016-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2014-01-01,2015-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2013-01-01,2014-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2012-01-01,2013-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2011-01-01,2012-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2010-01-01,2011-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2009-01-01,2010-01-01` },
  // { url: `/games?key=${API_KEY}&dates=2008-01-01,2009-01-01` },
];

// const description = [
//   { url: `/games/${gameID}?key=${API_KEY}&dates=2022-01-01,2023-01-01` },
// ];

// Description url https://api.rawg.io/api/games/41494?key=9dec4611319d4615b1fce70358ce3079
// Description url https://api.rawg.io/api/games/{id}?key=9dec4611319d4615b1fce70358ce3079

export default requests;
