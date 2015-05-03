var fs = require("fs");
var dirName = "/etc/asterisk/";
//var fileName = dirName+"sip.conf";
var fileName = "siptest.conf";

module.exports = {

    addUser : function(data){
        console.log("dao.addUser() entry");
        console.log(data);
        var userTxt = "\n" +
            "["+data.phone+"]\n" +
            "secret="+data.password+"\n" +
            "context=internal\n" +
            "host=dynamic\n" +
            "trustrpid=yes\n" +
            "sendrpid=no\n" +
            "type=friend\n" +
            "qualify=yes\n" +
            "qualifyfreq=600\n" +
            "transport=udp,ws\n" +
            "encryption=no\n" +
            "dial=SIP/7001\n" +
            "callerid="+data.firstName+" "+data.lastName+"<7001>\n" +
            "callcounter=yes\n" +
            "icesupport=yes\n" +
            "directmedia=no\n";
		fs.exists(fileName, function(exists) {
			if (exists) {
					fs.stat(fileName, function(error, stats) {
                        console.log("File exists")
                        fs.appendFile(fileName, userTxt, function (err) {
                            if (err) return console.log(err);
                            console.log('appending to the existing file');
                        });
					});
			}else{
                console.log("file doesn't exists");
                fs.writeFile(fileName, userTxt, function (err) {
                    if (err) return console.log(err);
                    console.log('created new file ');
                });
			}
		});

        // send out registration confirmation mail or message

		console.log("dao.addUser() exit");
    },
    readFile : function(){
        console.log("dao.readFile() entry");
        fs.exists(fileName, function(exists) {
            if (exists) {
                fs.stat(fileName, function(error, stats) {
                    fs.open(fileName, "r", function (error, fd) {
                        var buffer = new Buffer(stats.size);

                        fs.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {
                            var data = buffer.toString("utf8", 0, buffer.length);

                            console.log(data);
                            fs.close(fd);
                        });
                    });
                    console.log("dao.readFile() exit");
                });
            }
        });
    }
}; 
