const exp = require('express'),
    http = exp(),
    vhost = require('vhost'),
    https = require('https'),
    resolve = require('path').resolve;

http.disable("x-powered-by");

//--// Your domain name or localhost
global.domain = 'localhost';

//--// Set to true for express to use user provided certs, 
//--// Can be used inconjunction with Cloudflare's Origin CA certificates.
const ssl = false,
    certs = { key: '', cert: '' };

//--// Path for the content subdomain, 
//--// example: http://content.localhost/public/example.webp
global.contentPath = resolve('./content');

createSubdomains({
    //--// This is the root directory of your site.
    index: './router/www',
    subDomains: {
        //--// Subdomain_name: 'path to router',
        www: './router/www',
        content: './router/content'
    }
});

Server().listen(port, error => {
    if (error) console.error(error);
    else console.log(`Server listening on port: ${port}`);
});

function createSubdomains(subDomainObject) {
    Object.keys(subDomainObject.subDomains).forEach((key) => {
        let vhostHttp = require(subDomainObject.subDomains[key]);
        http.use(vhost(`${key}.${domain}`, vhostHttp.app))
        vhostHttp.app.disable("x-powered-by");
    });

    vhost(domain, require(subDomainObject.index).app)
}

function Server() {
    if (ssl) {
        global.port = 443;
        return https.createServer(certs, http);
    } else {
        global.port = 80;
        return http;
    }
}