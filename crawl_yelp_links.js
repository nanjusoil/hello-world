const request = require('request');
const fs = require('fs');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'a8508812a',
  database : 'foodict',

});

connection.connect();

/*
for(var i = 0 ; i < 153 ; i ++){
  setTimeout(function(i){
    //console.log(i);
    request('https://www.yelp.com/search?find_loc=Hsinchu&start=' + i*20, function (error, response, body) {
      const $ = cheerio.load(body);
      $('address').each(function(i , val){
        console.log($(this).text().trim())
      })
    });
  }, 3000 * i, i);
}*/
var content = [];

for(var i = 0 ; i < 7 ; i ++){
  request('https://ifoodie.tw/api/blog/?offset=' + i * 300 + '&limit=300&order_by=-date&city_name=%E5%8F%B0%E5%8C%97', function (error, response, body) {
    body = JSON.parse(body);
    body.response.forEach(function(val){
      //content.push(val.url);
      connection.query("INSERT INTO `store` ( `name`, `lat`, `lng`, `address`) VALUES ('test', '" + val.lat +"', '" + val.lng  +"', '" + val.restaurant[0].address  +"');", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
      });
      //console.log(val.lat + " " + val.lng);
    })
    fs.writeFile("hsinchu_url.json", JSON.stringify(content), 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }
    });

  });
}

//connection.end();
