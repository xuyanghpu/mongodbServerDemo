var express = require('express');
var router = express.Router();


var users = {
    'byvoid': {
        name: 'Carbo',
        website: 'http://www.byvoid.com'
    }
};


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/info/:username', function(req, res, next) {
// 检查用户是否存在
    if (users[req.params.username]) {
        next();
    } else {
        next(new Error(req.params.username + ' does not exist.'));
    }
});

router.get('/info/:username', function(req, res) {
// 用户一定存在，直接展示
    res.send(JSON.stringify(users[req.params.username]));
});

router.put('/info/:username', function(req, res) {
// 修改用户信息
    res.send('Done');
});

router.get('/list', function(req, res) {
  console.log('dd');
    res.render('list', {
        title: 'List',
        items: [1991, 'byvoid', 'express', 'Node.js']
    });
});
module.exports = router;
