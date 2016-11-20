var exec = require('child_process').exec;
var child;

module.exports = function(command , callback) {
child = exec(command, function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);

  callback(error)
  
});
}