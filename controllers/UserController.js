var exports = module.exports = {};
var User = require('../models/User.js');

exports.getAll = function (req, res) {
	User.find({}, function (err, result) {
		if (err) return res.status(500).send(err);
		return res.json(result);
	})
};