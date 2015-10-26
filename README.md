Web-deprecation
===================


Web deprecation is a simple REST Api with a built in interface that helps you be aware of what you've deprecated:

- what is deprecated _(name, group, description)_
- when it is deprecated
- when it will be removed totally _(for example, 6 months after deprecation)_
- by what will it be replaced
- what is impacted _(app ?)_


Setup
-------------

*Web-deprecation* is built with *nodejs* and *mongodb*, you'll need:

- [express](http://expressjs.com/) 
- [body-parser](https://github.com/expressjs/body-parser)
- [mongodb](https://www.mongodb.org/)
- [mongoose](http://mongoosejs.com/)
- [request](https://github.com/request/request)
- [jade](http://jade-lang.com/)

To run it, just clone the repository and do the following:
`npm install`
`node app.js`

> Be sure to have the correct `mongo` credentials in `config.js` and a db named `web-deprecation`

Then go to http://localhost:1337 by default.

> You can change the port in `config.js` file


Used
-------------------

- The back uses [express](http://expressjs.com/) and [mongodb](https://www.mongodb.org/)
- The front uses [angular](https://angularjs.org/), [angular material](https://material.angularjs.org/), [moment](http://momentjs.com/) and [Angular Material Icons](https://klarsys.github.io/angular-material-icons/)

ToDo
-------------------

- Improve security
- Improve readme
- Customize `config.js`

License
-------------------

**Web-deprecation** is provided with the **MIT** License

Copyright (c) 2015 <klein.quentin@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.