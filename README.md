# node-mjml-mustache-nodemailer

**Node + mjml + mustache + nodemailer**

## Installation

`npm install node-mjml-mustache-nodemailer`

## Usage

```javascript

var Client = require('node-mjml-mustache-nodemailer');

var config = {
  // Default mail sender
  default_from: 'jean.pierre@bern.ard',
  // If true, template content are stored in memory
  // Default to process.env.NODE_ENV === 'production' ? true : false
  cache: false,
  // Nodemailer configuration
  // See [https://github.com/nodemailer/nodemailer#send-using-smtp](https://github.com/nodemailer/nodemailer#send-using-smtp)
  smtp: {
    host: '127.0.0.1',
    port: 1025
  },
  // Use partials widh mustache
  partials: {
    my_template_name: 'My template str'
  }
};

var client = new Client(config);

// Set template file path
var template_path = './test.mjml.mustache';
var template_data = { username: 'jean pierre' };

client.sendMail(template_path, template_data, {
  to: 'test@test.tld',
  from: 'jean.pierre@bern.ard',
  subject: 'Hello'
  // See [nodemailer options for more](https://github.com/nodemailer/nodemailer#tldr-usage-example)
}).then(function(infos){
  // Email is sent
}, function(err){
  // an error was occured
});
```

## LICENSE

The MIT License (MIT)

Copyright (c) 2017

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
