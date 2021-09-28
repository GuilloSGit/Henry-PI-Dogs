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
const axios = require('axios')
const { Temperament } = require('./src/db');

// Syncing all the models at once.
const boolean = true

conn.sync({ force: boolean }).then(() => {
  server.listen(3001, async () => {
    const allData = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const everyTemperament = allData.data.map(el => el.temperament).map(el => el?.split(', '));
    /* Set para hacer UNIQUE :: Stackoverflow */
    const eachTemperament = [...new Set(everyTemperament.flat())];
    eachTemperament.forEach(el => {
      if (el) {
        Temperament.findOrCreate({
          where: { name: el }
        })
      }
    });
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});