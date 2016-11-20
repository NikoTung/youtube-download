var express = require('express');

var config = require('../config');

var crypto = require('crypto');

module.exports = function(app) {

	app.get('/' , function(req , res , next){
		res.redirect('/login');
		// res.render('index' , {
		// 		user: req.session.user,
		// 		error: req.flash('error').toString()
		// 	});
	});

	app.get('/login', checkNotLogin)
	app.get('/login' , function(req , res , next){
		res.render('login' , {
				user: req.session.user,
				error: req.flash('error').toString()
			});
	});

	app.post('/login' , function(req , res , next){
		var name = req.body.name;
		var password = req.body.password;

		var md5 = crypto.createHash('md5');
		password = md5.update(password).digest('hex');
		var realPassword = config.password;
		if (realPassword != password) {
			req.flash("error", '密码错误');
			return res.redirect('/');
		}

		req.session.user = {'user' : name};


		res.redirect('/download');
	});



	function checkLogin(req, res, next) {
		console.log('调用 checkLogin')
		if (!req.session.user) {
			return res.redirect('/login')
		};

		next()
	}


	function checkNotLogin(req, res, next) {
		var user = req.session.user || null;

		if (user) {
			return res.redirect('/download')
		};

		next()
	}

}
