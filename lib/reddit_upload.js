var through = require("through2"),
    Snoocore = require('snoocore');

module.exports = function () {
    return through.obj(function (file, encoding, done) {
        if (file.isBuffer()) {
            var config = require('../config/config.js');

            var reddit = new Snoocore({
                userAgent: 'beam-sync',
                login: {
                    username: config.user.username,
                    password: config.user.password
                },
                oauth: {
                    type: 'script',
                    consumerKey: config.app.token,
                    consumerSecret: config.app.secret,
                    scope: ['identity', 'modconfig']
                }
            });

            return reddit.auth().then(function () {
                var stylesheet = file.contents.toString(encoding).substring("@charset \"UTF-8\";".length + 1);

                return reddit([config.dest, 'api', 'subreddit_stylesheet'].join('/')).post({
                    api_type: 'json',
                    op: 'save',
                    reason: 'beam-sync update from ' + config.user.username + ' at ' + (new Date()),
                    stylesheet_contents: stylesheet
                });
            }).then(function (results) {
                return done();
            });
        }
    });
};
