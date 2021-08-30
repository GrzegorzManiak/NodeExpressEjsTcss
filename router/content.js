const cors = require('cors');
const exp = require('express');
const http = exp();

http.use(cors({
    origin: '*',
    methods: ['GET']
}));

//--// accessible by anyone, to configure a private content server,
//--// Youll need to write your own authentication script. 
http.use('/public', exp.static(contentPath.concat('/public')));

exports.app = http;