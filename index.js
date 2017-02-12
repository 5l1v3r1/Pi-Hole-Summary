var http = require("http");
var email = require("emailjs");

var server = email.server.connect({
	user: "user@email.tld",
	password: "EmailPassword",
	host: "smtp.email.tld",
	ssl: true
});
function today() {
     var date = new Date();
     var year = date.getFullYear();
     var month = date.getMonth() + 1;
     month = (month < 10 ? "0" : "") + month;
     var day = date.getDate();
     day = (day < 10 ? "0" : "") + day;
     return day + "/" + month + "/" + year;
 }

 http.get('http://127.0.0.1/admin/api.php', (res) => {
     res.setEncoding('utf8');
     res.on('data', function (body) {
         var obj = JSON.parse(body);
         var summary = "This is your Pi Hole summary for " + today() + "(D/M/Y).\n\nDomains being blocked: " +
         obj.domains_being_blocked + "\nDNS queries today: " + obj.dns_queries_today + "\nAds blocked today: " +
         obj.ads_blocked_today + "\nAds to total queries: " + obj.ads_percentage_today;

         server.send({
             text: summary,
             from: "Pi Hole Bot <Miles@aaathats3as.com>",
             to: "Miles <miles@aaathats3as.com>",
             subject: "Pi Hole Summary ("+ today() +")"
         }, function (err, message) { console.log(err); });

     });
 });
