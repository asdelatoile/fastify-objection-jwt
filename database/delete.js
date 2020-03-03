const fs = require('fs');
const fileName = __dirname + '/api.sqlite'
if (fs.existsSync(fileName)) {
    fs.unlink(__dirname + '/api.sqlite', function (err) {
        if (err) throw err;
        console.log('DB deleted!');
    });
}