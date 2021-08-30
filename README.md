# NodeExpressEjsTcss (NEET)
Boilerplate code for NEET, Node.js, Express.js, Ejs and Tailwind CSS, I made this as when you need to start a new project, there's no point in re-writing the basics every time.

## What features does this include?
1. This includes a place where you can host your files on the **content** subdomain.  
2. Premade scripts to compile your Tailwind CSS files.  
3. An easy subdomain router function.  
4. Easy SSL and Cloudflare Origin CA certificate setup by just setting the **SSL** boolean to **true**. 
5. Already set up an EJS environment. 

## Scripts.
1. ```npm run debug``` - Runs Nodemon for easy development, automatically restarts the server on change to any file.
2. ```npm run main``` - Runs the Server straight through node.js.
3. ```npm run build:css``` - Builds all CSS files in the 'tailwind_src' folder directly to the public content repository, copying folder and file names. 

## Configuration.


#### createSubdomains(Object);
This function is responsible for routing subdomains to make your code easier to read,
To declare a new subdomain, you edit the **subDomains** Object by adding a **key** which will be the actual subdomain-name,
Then you add a **value** to that **key** which declares the route location.

The ```index``` key is responsible for declaring the root route, usually the same as the **www.** route.

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
These two **const**'s are related, as if you enable **SSL** by setting it to **true**, You'll need to provide a path to the Certificate and key
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
