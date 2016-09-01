var request = require('request');
var cheerio = require('cheerio');

var urls = [
  'http://www.bom.gov.au/jsp/ncc/cdio/weatherData/av?p_nccObsCode=122&p_display_type=dailyDataFile&p_startYear=&p_c=&p_stn_num=066062',
  'http://www.bom.gov.au/jsp/ncc/cdio/weatherData/av?p_nccObsCode=122&p_display_type=dailyDataFile&p_startYear=&p_c=&p_stn_num=066160'
];

var selector = 'ul.downloads a';
var phrase = 'All years of data';

urls.forEach(function(url) {

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $(selector).each(function() {
        var $link = $(this);
        if ($link.text() === phrase) {
          console.log($link.attr('href'));
        }
      });
    }
  });

});
