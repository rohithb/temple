
/**
 * Module dependencies.
 */
require('./db');
require('newrelic');  
var express = require('express');
var routes = require('./routes');
var error = require('./error');
var user = require('./routes/user');
var core = require('./routes/core');
var http = require('http');
var path = require('path');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//error Hadler
app.use(error.error);

// add some error page here.
process.on('uncaughtException', function (err) {
	console.log("An uncaughtException ..");
	console.log(err.stack);
})
// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }
passport.use(new GitHubStrategy({
  clientID: 'fd436fd9d8f991a1e13b',
  clientSecret: 'ca46fd0049610a691695f4c3b200858e0b876881',
  callbackURL: 'http://localhost:3000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    return done(null, profile);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Mappings
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/success',
  failureRedirect:'/error'
}));
//error page if login fails
app.get('/success', loggedIn, user.signUp);
app.get('/error', function(req, res, next) {
  res.send("Error logging in.");
});
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.get('/', routes.index);
app.get('/initialize', loggedIn, user.initialize);
app.get('/manage-pages', loggedIn, core.managePages);
app.put('/page/save-or-update',loggedIn, core.pageSaveOrUpdate);
app.get('/page/load/:id', loggedIn, core.pageLoad);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//function to check whether loged in or not 
function loggedIn(req, res, next) {
//remove this variable after development.
  req.user = { provider: 'github',
  id: 6967588,
  username: 'templeb',
  profileUrl: 'https://github.com/templeb',
  emails: [ {} ],
  _raw: '{"login":"templeb","id":6967588,"avatar_url":"https://avatars.githubusercontent.com/u/6967588?","gravatar_id":"4d4ac8639fd02fb00fb26555090fa72d","url":"https://api.github.com/users/templeb","html_url":"https://github.com/templeb","followers_url":"https://api.github.com/users/templeb/followers","following_url":"https://api.github.com/users/templeb/following{/other_user}","gists_url":"https://api.github.com/users/templeb/gists{/gist_id}","starred_url":"https://api.github.com/users/templeb/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/templeb/subscriptions","organizations_url":"https://api.github.com/users/templeb/orgs","repos_url":"https://api.github.com/users/templeb/repos","events_url":"https://api.github.com/users/templeb/events{/privacy}","received_events_url":"https://api.github.com/users/templeb/received_events","type":"User","site_admin":false,"public_repos":1,"public_gists":0,"followers":0,"following":0,"created_at":"2014-03-16T16:50:05Z","updated_at":"2014-03-18T15:02:57Z"}',
  _json: 
   { login: 'templeb',
     id: 6967588,
     avatar_url: 'https://avatars.githubusercontent.com/u/6967588?',
     gravatar_id: '4d4ac8639fd02fb00fb26555090fa72d',
     url: 'https://api.github.com/users/templeb',
     html_url: 'https://github.com/templeb',
     followers_url: 'https://api.github.com/users/templeb/followers',
     following_url: 'https://api.github.com/users/templeb/following{/other_user}',
     gists_url: 'https://api.github.com/users/templeb/gists{/gist_id}',
     starred_url: 'https://api.github.com/users/templeb/starred{/owner}{/repo}',
     subscriptions_url: 'https://api.github.com/users/templeb/subscriptions',
     organizations_url: 'https://api.github.com/users/templeb/orgs',
     repos_url: 'https://api.github.com/users/templeb/repos',
     events_url: 'https://api.github.com/users/templeb/events{/privacy}',
     received_events_url: 'https://api.github.com/users/templeb/received_events',
     type: 'User',
     site_admin: false,
     public_repos: 1,
     public_gists: 0,
     followers: 0,
     following: 0,
     created_at: '2014-03-16T16:50:05Z',
     updated_at: '2014-03-18T15:02:57Z' } };
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
};