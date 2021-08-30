const cors = require('cors');
const http = require('express')();

http.set('view engine', 'ejs');

http.use(cors({
    origin: '*',
    methods: ['GET']
}));

http.get('/', (req, res) => {
    res.render('pages/index');
});

exports.app = http;