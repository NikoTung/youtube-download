
var command = require('../model/command.js')

module.exports = function(app) {

	app.get('/download' , function(req , res){
		  res.render('download');
	});

	app.post('/download' , function(req , res){
		var title =req.body.title;
		var url = req.body.url;
		console.log(title , url);

		var commandToExec = 'youtube-dl -o ' + title + ' ' + url;
		command(commandToExec ,function(error){
			console.log('exec command error ' , error);
		})

		return res.redirct("/download");
	});

}