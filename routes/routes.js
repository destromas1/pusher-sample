var express = require('express');
var Pusher = require('pusher');
var escapeHTML = require('escape-html');

var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

var pusher = new Pusher({
	appId: '336513',
	key: 'cd0a44fe0831a8327670',
	secret: '9fa5ed5105202fec19b2',
	cluster: 'eu',
  	encrypted: true
});

router.post('/api/pusher/auth', function(req, res) {
  console.log("auth------------>");
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  console.log(socketId,channel , auth);
  res.send(auth);
});


router.post('/api/notification', function(req, res){
	console.log(req.body.message);
	var message = escapeHTML(req.body.message);

	pusher.trigger('private-notifications-channel', 'new_notification', {
		message: message + " from Server"
	});
	res.send("API Notification triggered Succesfully!");
});

module.exports = router;
