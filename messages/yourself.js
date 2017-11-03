var builder = require('botbuilder');

module.exports = [
    // Destination
    function (session, next) {
        session.send('Well, here are the basics');
        session.send('My name is, of course, Javier');
            var my_age = 28 //replace this with a function to calculate my age
        session.send('I\'m '+my_age);
        builder.Prompts.text(session, 'And, I currently live in Chicago, but \'home\' is an elusive concept for me, care to know why?');
    },
    function (session, result, next) {
        if (result.response == 'yes') {
            session.send('Well, where I live is different than where I was born, than where I grew up, than where my parents live, than where my family lives.')
            session.send('I\'ve come to embrace home as a feeling more than a place.')
        } else { builder.Prompts.text(session, 'Well, do you want to hear about my work, my education, or my hobbies?')}
    }
]