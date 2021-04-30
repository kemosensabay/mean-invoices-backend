
const crypto = require('crypto').randomBytes(256).toString('hex');
module.export = crypto;

//crypto.randomBytes(256, (err, buf) => {
 // if (err) throw err;
 // console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
//});
