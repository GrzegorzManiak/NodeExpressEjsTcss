# NodeExpressEjsTcss (NEET)
Boilerplate code for NEET, Node.js, Express.js, Ejs and Tailwind Css, I made this as when you need to start a new project, theres no point to re-writeing the basics everytime.

## What features dose this include?
1. This includes a place where you can host your own files on the **content** subdomain.  
2. Premade scripts to compile your Tailwind Css files.  
3. An easy subdomain router function.  
4. Easy SSL and cloudflare Origin CA certificate setup by just setting the **ssl** boolean to **true**. 
5. Already setup EJS environment.. 

## Scripts.
1. ```npm run debug``` - Runs Nodemon for easy development, automaticaly restarts the server on change to any file.
2. ```npm run main``` - Runs the Server straight trough node.js.
3. ```npm run build:css``` - Builds the tailwind.css file directly to the public content repository.
4. ```npm run prod:css``` - Builds the tailwind.css file directly to the public content repository in production mode.  

## Configuration.


#### createSubdomains(Object);
This function is responsible for routing subdomains to make your code easier to read,
To declare a new subdomain, you choose edit the **subDomains** Object by adding a **key** which will be the subdomain-name,
Then you add a **value** to that **key** which declares the route location.

The ```index``` key is responsible for declareing the root route, usaly the same as the **www.** route.

```js 
createSubdomains({
    index: './router/www',
    subDomains: {
        www: './router/www',
        content: './router/content'
    }
});
```

#### const ssl = Boolean, certs = Object;
These two **consts** are related, as if you enable **ssl** by setting it to **true**, You'll need to provide a path to the Certificate and key
By the means of the **certs** Object.

```js 
const ssl = false,
    certs = { key: '', cert: '' };
```

#### global.domain = String;
If you own a domain, insert it here, else use localhost.

```js
global.domain = 'localhost';
```

#### Router template
You can treat this as a normal express.js server.
This is set to accept requests from any site with the **cors** Package.

```js
const cors = require('cors');
const exp = require('express');
const http = exp();

http.use(cors({
    origin: '*',
    methods: ['GET']
}));

http.get('/', (req, res) => {
    res.setStatus = 200;
    res.send('test');
    res.end();
});

exports.app = http;
```
