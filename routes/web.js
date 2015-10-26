module.exports.index = function(req, res){
  res.render('index');
};

module.exports.create = function(req, res) {
  res.render('create');
};

module.exports.notfound = function(req, res) {
  res.render('partials/404');
};

module.exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};