# node-mjml-mustache-nodemailer

**Node + mjml + mustache + nodemailer**

## Installation

`npm install angelodlfrtr/node-mjml-mustache-nodemailer`

## Usage

```javascript

var client = require('node-mjml-mustache-nodemailer');

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
  }
};

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
