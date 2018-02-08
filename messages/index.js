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
    openIdMetadata: process.env['BotOpenIdMetadata']
});

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

var bot = new builder.UniversalBot(connector);
bot.localePath(path.join(__dirname, './locale'));
bot.set('storage', tableStorage);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
.matches('askAboutMe', (session) => {
    session.send('I\'m JaviBot');
    session.sendTyping();
    setTimeout(function(){
        session.send('In the universe that is Javier, I\'m the night sky visible to the naked eye for those willing to look up.');
        }, 3000);
    setTimeout(function(){
        session.sendTyping();
        }, 3001);
    setTimeout(function(){
        session.send('But for all intents and purposes I\'m Javier.');
        }, 4000);
    setTimeout(function(){
        session.sendTyping();
        }, 4001);
    setTimeout(function(){
        session.send('I can tell you about my work experience, education, upbringing, hobbies, passions, and the like.');
        }, 7000);
    setTimeout(function(){
        session.send(String.fromCharCode(0xD83D, 0xDE01));
        }, 8000);
})
.matches('askAboutFeeling', (session) => {
    session.send('I\'m well!');
    session.sendTyping();
    setTimeout(function(){
    session.send('Excited to be talking to you.');
    }, 3000);
})
.matches('askAge', (session) => {
    session.send('I\'m 28 years old.');
    session.sendTyping();
    setTimeout(function(){
    session.send('I feel younger at heart, but definitely older on weekends though.');
    }, 5000);
})
.matches('askBackground', (session) => {
    session.send('I was born in Madrid, Spain, grew up in San Salvador, El Salvador, and now live in Chicago, IL.');
})
.matches('askAboutSpain', (session) => {
    session.send('I was just 3 years old when I left Spain, so there is not much I remember');
    session.send('I\'ve returned many times since, though, and I have found that in many ways, the feelings created by the memories I make now, fill in for those I missed out on.');       
})
.matches('askAboutEducation', (session) => {
    session.sendTyping();
    setTimeout(function(){
        session.send('I got my bachelor\'s degree in Political Science & Economics from Colgate University.');
        }, 3000);
    setTimeout(function(){
        session.send('I graduated Summa Cum Laude and Phi Beta Kappa.');
        }, 4000);
    setTimeout(function(){
        session.sendTyping();
        }, 4001);
    setTimeout(function(){
        session.send('I\'m currently pursuing my MBA at the University of Chicago\'s Booth School of Business.');
        }, 6000);
    setTimeout(function(){
        session.sendTyping();
        }, 6001);
    setTimeout(function(){
        session.send('Concentrating in Marketing, Satistics, and Finance.');
        }, 7000);
    setTimeout(function(){
        session.send('I\'ll be done in late 2018.');
        }, 8000);
})
.matches('askAboutWork', (session) => {
    session.send('I\'ve been a Product Manager at McMaster-Carr Supply Co. for 4 years now.');
    session.send('I\'ve managed ordering ecosystems, customers\' delivery experience, as well as internal applications');
})
.matches('askAboutOrdering', (session) => {
    session.sendTyping();
    setTimeout(function(){
        session.send('I\'ve been the Ordering Product Manager for the better part of a year now.');
        }, 1000);
    setTimeout(function(){
        session.sendTyping();
        }, 1001);
    setTimeout(function(){
        session.send('In that time, we\'ve streamlined the ordering experience and integrated it with the entire order lifecycle.');
        }, 4000);
    setTimeout(function(){
        session.sendTyping();
        }, 4001);
    setTimeout(function(){
        session.send('We brought powerful search functionality that makes it easy for users to search by order number, invoice number, part number, item category . . . the whole 9 yards.');
        }, 9000);
    setTimeout(function(){
        session.sendTyping();
        }, 9001);
    setTimeout(function(){
        session.send('We added a single click re-order option for single items or entire orders.');
        }, 10000);
    setTimeout(function(){
        session.sendTyping();
        }, 10001);
    setTimeout(function(){
    session.send('Then we integrated the cart into users\' order history, allowing them to easily build new orders and keep track of the progress of the order.');
    }, 15000);
    setTimeout(function(){
        session.sendTyping();
        }, 15001);
    setTimeout(function(){
        session.send('We also designed saved orders to be flexible, easy to place, but also function as collections.');
        }, 17000);
    setTimeout(function(){
        session.sendTyping();
        }, 17001);
    setTimeout(function(){
        session.send('By abstracting a plethora of user needs into a few basic functional models, we designed a very flexible ordering ecosystem that served many idiosyncratic needs and whose design was not inherently prescriptive.');
        }, 22000);
    setTimeout(function(){
        session.sendTyping();
        }, 22001);
    setTimeout(function(){
        session.send('Really, cool stuff, in my opinion.');
        }, 23000);
})
.matches('askAboutDelivery', (session) => {
    session.sendTyping();
    setTimeout(function(){
        session.send('I was the Delivery Experience Product Manager for almost 2 years.');
        }, 3000);
    setTimeout(function(){
        session.sendTyping();
        }, 3001);
    setTimeout(function(){
        session.send('One of our big deliverables was, well . . . delivery estimates on our site.');
        }, 5000);
    setTimeout(function(){
        session.sendTyping();
        }, 5001);
    setTimeout(function(){
        session.send('Sounds really basic, but it\'s not really when you have a complex delivery network aimed at achieving next-day delivery, but rife with exceptions for hazards and other items regulated for transport.');
        }, 8000);
    setTimeout(function(){
        session.sendTyping();
        }, 8001);
    setTimeout(function(){
        session.send('But what I\'m really proud of is helping create a score-based algorithm that will consider days to delivery, delivery time, delivery cost to the company and the customer, number of packages and more to make the best shipping decision.' );
        }, 12000);
    setTimeout(function(){
        session.sendTyping();
        }, 12001);
    setTimeout(function(){
        session.send('Most parameters are set to replicate today\'s outcomes - but our model is flexible enough to adapt to changes overnight, say a rate hike by UPS but not FedEx. But, even cooler, to eventually consider factors such as real-time fulfillment center work-in-process, to determine the best fulfillment center to fill from and shipping method.' );
        }, 18000);
    setTimeout(function(){
        session.sendTyping();
        }, 18001);
    setTimeout(function(){
        session.send('It\'s hard to ever look at e-commerce the same way now.' );
        }, 20000);
})
.matches('askAboutHobbies', (session) => {
    session.send('I have more hobbies than I have time for.');
    setTimeout(function(){
        session.sendTyping();
        }, 1000);
    setTimeout(function(){
        session.send('I love hockey. I like to run. I try to keep my French, German, and Italian up to snuff, I\'m a film fanatic, I dabble in photography, and try to regularly visit the Chicago Cultural Center as well as the Art Institute.');
        }, 5000);
})
.matches('askAboutLanguages', (session) => {
    setTimeout(function(){
        session.sendTyping();
        }, 1);
    setTimeout(function(){
        session.send('Spanish is my first language and I\'m fluent in English, though I might have already given that away.');
        }, 3000);
    setTimeout(function(){
        session.sendTyping();
        }, 3001);
    setTimeout(function(){
        session.send('I\'m fluent in French and conversational in German and Italian.');
        }, 6000);
})
.matches('askAboutHockey', (session) => {
    session.sendTyping();
    setTimeout(function(){
        session.send('I did not see snow until I was 19, so naturally, hockey was a perfect fit. My 5\'6\'\' stature was also a plus.');
        }, 3000);
    setTimeout(function(){
        session.sendTyping();
        }, 3001);
    setTimeout(function(){
        session.send('That\'s why I think I love hockey so much though. Because I never saw myself playing it, because I thought I was too old to ever pick up a stick.');
        }, 6000);
    setTimeout(function(){
        session.sendTyping();
        }, 6001);
    setTimeout(function(){
        session.send('Yet, here I am, and so is my tailbone. Doing the unexpected is so rewarding.');
        }, 6000);
})
.matches('askAboutFilm', (session) => {
    session.sendTyping();
    setTimeout(function(){
        session.send('Like other media, I love how films can memorialize a feeling. They can be played and re-played and with them memories lived and re-lived, and feelings felt and felt again.');
        }, 5000);
    setTimeout(function(){
        session.sendTyping();
        }, 5001);
    setTimeout(function(){
        session.send('That\'s why my favorite films are slow and uneventful, but captivating in the beauty with which they capture the wonders of daily life.');
        }, 10000);
    setTimeout(function(){
        session.sendTyping();
        }, 10001);
    setTimeout(function(){
        session.send('Before the reality that my parents could not support me beyond my collegiate ambitions, I always wanted to be an actor.');
        }, 15000);
    setTimeout(function(){
        session.sendTyping();
        }, 15001);
    setTimeout(function(){
        session.send('It felt like the most direct path between me and the feelings of others.');
        }, 17000);
    setTimeout(function(){
        session.sendTyping();
        }, 17001);
    setTimeout(function(){
        session.send('I reach people through products and experiences, today - the path is not as direct, but it can be as rewarding.');
        setTimeout(function(){
            session.sendTyping();
            }, 17001);
        setTimeout(function(){
            session.send('I reach people through products and experiences, today - the path is not as direct, but it can be as rewarding.');
            }, 17000);
        }, 17000);
})
.matches('Help', (session) => {
    session.send('I can tell you about my work experience, education, upbringing, hobbies, passions, and the like.');
    session.sendTyping();
    setTimeout(function(){
        session.send('Alternatively you can click on the contact link on the top right and reach me through any number of media.');
        }, 3000);
})
.matches('Cancel', (session) => {
    session.send('You reached Cancel intent, you said \'%s\'.', session.message.text);
})
/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/
.onDefault((session) => {
    session.send('\'%s\'? I\'m not sure what to do with that. Why don\'t you e-mail the real Javier at jcalvomendoza@gmail.com ', session.message.text);
});

bot.dialog('/', intents);    

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = connector.listen();
}

