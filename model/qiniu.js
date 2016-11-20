var qiniu = require('qiniu');
var config = require('../config');

qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;

var bucket = config.bucket;

module.exports = function(filePath , name , callback){

var putPolicy = new qiniu.rs.PutPolicy2(new qiniu.rs.PutPolicy(bucket + ":" + name));

var token = putPolicy.token();


console.log(token);

//key 上传空间的文件名需要和 putPolicy 中的key 相同
qiniu.io.putFile(token,name,filePath ,null,function(err, ret) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(ret);
      console.log(ret.key, ret.hash, ret.returnBody);
      // ret.key & ret.hash
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
      // http://developer.qiniu.com/docs/v6/api/reference/codes.html
    }
    callback(err);
  });
}
