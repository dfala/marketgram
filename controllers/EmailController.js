var exports = module.exports = {};


var mandrill = require('mandrill-api/mandrill');
// var keys = require('../models/Keys.js');

var mandrill_client = new mandrill.Mandrill('x6RL-uINxCdZp1ysS41EOg');
// var mandrill_client = new mandrill.Mandrill(keys.mandrill);

var async = true;
var ip_pool = "Main Pool";


// Heavy lifting
exports.sendEmail = function (req, res) {
	var body = req.body;

    if (!body.html && !body.subject) return res.status(500).send('No message to send.');

    // TODO: correct from info once it's live
    // Create message:
    var message = {
	    text: "Ooops! The original message was not sent correctly.",
	    html: body.html,
	    subject: body.subject,
	    to: body.to,
		from_name: 'MarketGram',
		from_email: 'yofala@gmail.com',
		headers: {
			'Reply-To': 'yofala@gmail.com'
		}
	};



    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        console.log(result);
    	res.send('Emails are in queue');

    }, function(e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        res.status(500).send(e);
    });


};


// EXAMPLE EMAIL
// var message = {
//     text: "Ooops! The original message was not sent correctly.",
//     html: 'You are invited to login to DevMountain',
//     subject: 'This is the subject line, obviously',
//     to: [{
//     	email: 'yofala@gmail.com',
// 		type: "to"
// 	}],
//     from_name: 'Daniel Falabella',
//     from_email: 'yofala@gmail.com',
//     headers: {
//     	'Reply-To': 'yofala@gmail.com'
//     }
// };