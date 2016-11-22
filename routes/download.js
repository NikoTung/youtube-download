
var command = require('../model/command.js');
var qiniu = require('../model/qiniu.js');

module.exports = function(app) {

	app.get('/download' , function(req , res){
		var user =  req.session.user ;
		if (!user) {
			res.redirect('/');
		};
		res.render('download');
	});

	app.post('/download' , function(req , res){
		var title =req.body.title;
		var url = req.body.url;
		console.log(title , url);

		var commandToExec = 'youtube-dl -o ' + title + ' ' + url;
		// var commandToExec = 'ls -a';
		command(commandToExec ,function(error){
			console.log('exec command error ' , error);

			if (error) {
				res.send(error);
			} 

			qiniu('./package.json' , title , function(error){
				if (error) {
					res.send('upload qiqniu fail' + error);
				};

				res.send('upload qiqniu success');
			});

		})

	});

}