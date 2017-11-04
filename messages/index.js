/*-----------------------------------------------------------------------------
This template demonstrates how to use an IntentDialog with a LuisRecognizer to add 
natural language support to a bot. 
For a complete walkthrough of creating this type of bot see the article at
https://aka.ms/abs-node-luis
-----------------------------------------------------------------------------*/
"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var path = require('path');

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);
bot.localePath(path.join(__dirname, './locale'));

// Make sure you add code to validate these fields
/*var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';*/

const LuisModel = process.env.model || 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/a4e76ead-6a36-4295-bbf5-ad248d6459c7?subscription-key=6015562483a6496aa4b663bcf624f535&spellCheck=true&verbose=true&timezoneOffset=-6.0&q=';

// Main dialog with LUIS
var greeting_recognizer = new builder.LuisRecognizer(LuisModel);
var greeting_intents = new builder.IntentDialog({ recognizers: [greeting_recognizer] })
/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/
.onDefault((session) => {
    session.send('Sorry, \'%s\' is the stupidest thing I\'ve heard', session.message.text);
});

bot.dialog('/', greeting_intents);    

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}


/*var LuisModel = process.env.model || 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/a4e76ead-6a36-4295-bbf5-ad248d6459c7?subscription-key=6015562483a6496aa4b663bcf624f535&spellCheck=true&verbose=true&timezoneOffset=-6.0&q=';
bot.recognizer(new builder.LuisRecognizer(LuisModel));
// Sample Dialog Code to be replaced later
bot.dialog('/deleteAlarm', [
    function (session, args, next) {
        if (alarmCount() > 0) {
            // Resolve entities passed from LUIS.
            var title;
            var intent = args.intent;
            var entity = builder.EntityRecognizer.findEntity(intent.entities, 'builtin.alarm.title');
            if (entity) {
                // Verify its in our set of alarms.
                title = builder.EntityRecognizer.findBestMatch(alarms, entity.entity);
            }
            
            // Prompt for alarm name
            if (!title) {
                builder.Prompts.choice(session, 'Which alarm would you like to delete?', alarms);
            } else {
                next({ response: title });
            }
        } else {
            session.endDialog("No alarms to delete.");
        }
    },
    function (session, results) {
        delete alarms[results.response.entity];
        session.endDialog("Deleted the '%s' alarm.", results.response.entity);
    }
]).triggerAction({
    matches: 'AskAboutMe'});*/
