var express = require('express');
var router = express.Router();

let contacts = [
  {
    id: 1,
    first: 'Donald',
    last: 'Trump',
    phone: '1234567890',
    email: 'dtrump@whitehouse.gov'
  },
  {
    id: 2,
    first: 'JD',
    last: 'Vance',
    phone: '9876543210',
    email: 'jd@whitehouse.gov'
  }
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', {
    title: 'Contact List',
    contacts,
    noContacts: !contacts?.length,
    partials: { content: 'index.hjs'} });
});

router.get('/addContact', (req, res, next) => {
  console.log('get',contacts[req.query.id])
  res.render('layout', {
    title: 'Add Contact',
    contact: contacts[req.query.id - 1],
    partials: { content: 'addContact.hjs' },
  });
});

router.post('/addContact', (req, res, next) =>{
  console.log('post',req.body.id)
  if (req.body.id){
    contacts[req.body.id -1] = req.body
  }
  else{
    const id = Math.max(...contacts.map(person => person.id)) + 1
    req.body.id = id === -Infinity ? 1 : id
    contacts.push(req.body);
    console.log()
  }
  
  res.writeHead(301, {
    location: '/'
  });

  res.end();
});

router.post('/deleteContact/:id', (req, res, next) => {
  contacts = contacts.filter(c => c.id !== Number(req.params.id));

  res.writeHead(301, {
    location: '/'
  });

  res.end();
});

module.exports = router;
