var express = require('express');
var sendgrid = require('sendgrid')(process.env.SENDGRID_KEY);
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aerial Solutions' });
});
router.get('/contacto', function(req, res, next){
  res.render('contacto', { title:'Formulario de contacto' })
})
router.post('/contacto', function(req, res, next){
  sendgrid.send({
    to: 'msantoyogtz@gmail.com',
    from: req.body.email,
    subject: req.body.text + '  ' + req.body.tel,
  }, function(error, json){
    if (error) {
      res.render('message',{ title: 'Error', message:'No hemos podido enaviar tus datos' })
    } else {
      res.render('message',{ title: 'Mensaje enviado', message:'Hemos Enviado tus datos' })
    }
  })
  console.log(req.body);
  // res.render('message', { title: 'Mensaje enviado', message:'Hemos Enviado tus datos' })
})
module.exports = router;
