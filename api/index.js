//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Countries } = require('./src/db.js');
const axios = require('axios');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    const allCountries = await Countries.findAll();
    if(!allCountries.length) {
      const { data } = await axios.get("https://restcountries.com/v3/all");
      const countriesData = data;

      var countriesMap = countriesData.map((element) => {
        return {
          id: element.cca3,
          name: element.name.common,
          image: element.flags[0],
          continent: element.continents[0],
          capital: element.capital ? element.capital[0] : "capital not found",
          subregion: element.subregion ? element.subregion : "subregion not found",
          area: element.area ? element.area : "area not found",
          population: element.population
        }
      })
      await Countries.bulkCreate(countriesMap);
    }
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
