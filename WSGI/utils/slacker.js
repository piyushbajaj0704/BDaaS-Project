/**
 * Created by charl on 12/11/2017.
 */

var Slack = require('slack-node');

url = 'https://hooks.slack.com/services/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';


exports.sendSlackMessage = function (message) {
    webhookUri = url;

    slack = new Slack();
    slack.setWebhook(webhookUri);

    slack.webhook({
        channel: "#smartfarm",
        username: "farm-bot",
        text: message
    }, function (err, response) {
        console.log("message sent to slack.");
    });
};
