/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const HelloIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'HelloIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(WELCOME_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .withSimpleCard(SKILL_NAME, 'Greetings!')
      .getResponse();
  },
};

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
      && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const factArr = data;

    var planet = request.intent.slots.planetName.value;
    if(planet == undefined || planet == null){
      
      const planetArr = ['mercury', 'mars', 'earth', 'venus', 'jupiter', 'neptune', 'saturn', 'pluto', 'uranus'];
      const planetIndex = Math.floor(Math.random() * planetArr.length);
      planet = planetArr[planetIndex];
    }
    
    planet = planet.toLowerCase();
    console.log(planet);
    
    var msg, randomFact, speechOutput;
    
    switch (planet) {
      case 'mercury':
      case 'mars':
      case 'venus':
      case 'earth':
      case 'neptune':
      case 'jupiter':
      case 'saturn':
      case 'uranus':
      case 'pluto' :
        
        randomFact = factArr[planet];
        const factIndex = Math.floor(Math.random() * randomFact.length);
        msg = randomFact[factIndex];
        speechOutput = GET_FACT_MESSAGE + planet + '<break time="0.7s"/> '+ msg;

        break;
      
      default:
        msg = 'Not a planet in my universe!!!';
        speechOutput = `Sorry! ${planet} is not a planet in my universe`;
    }

    console.log(msg);

    return handlerInput.responseBuilder
      .speak(speechOutput + FOLLOW_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .withSimpleCard(planet.toUpperCase(), msg)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .withSimpleCard(SKILL_NAME, STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Explore The Unknown';
const WELCOME_MESSAGE = 'Hi there, ask me for a planet to know its fact.';
const GET_FACT_MESSAGE = 'Here\'s your fact about ';
const FOLLOW_MESSAGE = '<break time="1s"/> Ask again or say bye!';
const HELP_MESSAGE = 'You can say tell me a space fact for a planet.';
const HELP_REPROMPT = 'Tell me a planet name(mars, earth, jupiter)';
const FALLBACK_MESSAGE = 'Sorry, I can only tell facts about planets. Try asking one the planet name';
const STOP_MESSAGE = 'Goodbye! Hope your space travel is amazing.';

const data = {
  'mercury' : [
    'A year on Mercury is just 88 days long.',
    'Mercury has no moons or rings because of its low gravity and lack of atmosphere.',
    'Mercury has a large iron core that is around 40% of its volume.',
    'Your weight on Mercury would be 38% of your weight on Earth.',
    'It’s not known who discovered Mercury.',
    'Mercury has a diameter of 4,879 km.',
    'Only two spacecraft have ever visited Mercury. Owing to its proximity to the Sun, Mercury is a difficult planet to visit.',
    'Mercury is named after the messenger of the Roman gods, who is also known as Hermes in Greek mythology.'],
    
  'venus' : [
    'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
    'A day on Venus lasts longer than a year. ',
    'The Russians sent the first mission to Venus. ',
    'Venus does not have any moons or rings.',
    'Venus is thought to be made up of a central iron core, rocky mantle and silicate crust.',
    'The surface temperature on Venus can reach 471 °C.',
    'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.'],
    
  'mars' : [
    'On Mars, the Sun appears about half the size as it does on Earth.',
    'The Sun looks about half its size half it does from Earth when seen from Mars.',
    'Mars is the only other planet besides Earth that has polar ice caps.',
    'There are signs of liquid water on Mars. For years Mars has been known to have water in the form of ice.',
    'Pieces of Mars have fallen to Earth.',
    'One day Mars will have a ring.',
    'Mars is also often described as the “Red Planet” due to its reddish appearance.',
    'Mars has the largest dust storms in the solar system. They can last for months and cover the entire planet. ',
    'The tallest mountain known in the solar system is on Mars. Olympus Mons is a 21 km high and 600 km diameter shield volcano.'],
    
  'earth' : [
    '70% of the Earth’s surface is covered by water ',
    'Earth is the only planet not named after a god.',
    'Earth is the only planet in the solar system not named after a mythological being.',
    'Earth is the third planet from the Sun and is the largest of the terrestrial planets.',
    'The Earth was once believed to be the centre of the universe.',
    'Earth was formed somewhere around 4.54 billion years ago and is currently the only known planet to support life - and lots of it.'],
    
  'jupiter' : [
    'Jupiter has the shortest day of all the planets.',
    'Jupiter does not experience seasons like other planets such as Earth and Mars.',
    'Jupiter is the fourth brightest object in our solar system.',
    'The largest of Jupiter’s moons, Ganymede is the largest moon in the solar system.',
    'One orbit of the Sun takes Jupiter 11.86 Earth years.',
    'Jupiter’s Great Red Spot is an enormous storm that has been raging for over 300 years.'],
    
  'neptune' : [
    'Neptune is the Roman God of the Sea. In Greek, Neptune is called Poseidon',
    'Neptune has 14 moons.',
    'It was named after the Roman god of the sea.',
    'One of the largest storms ever seen was recorded in 1989. It was called the Great Dark Spot. It lasted about five years.',
    'Only one spacecraft, the Voyager 2, has flown past Neptune'],
    
  'saturn' : [
    'Saturn is the flattest of the eight planets.',
    'Saturn can be seen with the naked eye.',
    'Saturn is made mostly of hydrogen.',
    'Saturn has 150 moons and smaller moonlets.',
    'Four spacecraft have visited Saturn. Pioneer 11, Voyager 1 & 2, and the Cassini-Huygens mission have all studied the planet.',
    'Saturn is the least dense planet in the solar system.'],  
  
  'uranus' : [
    'It takes Uranus 84 Earth days to orbit the Sun.',
    'Uranus is often referred to as the “ice giant.”',
    'Uranus was officially discovered by Sir William Herschel in 1781.',
    'Uranus is often referred to as an “ice giant” planet.',
    'Uranus makes one trip around the Sun every 84 Earth years.',
    'The chemical element Uranium, discovered in 1789, was named after the newly discovered planet Uranus.',
    'Uranus is the coldest planet in the solar system. The minimum surface temperature on Uranus is -224°C.'],
    
  'pluto' : [
    'In 2006, Pluto was reclassified from a planet to a dwarf planet.',
    'Pluto is expected to have a solid rocky core, surrounded by a water ice mantle and a frozen nitrogen surface.',
    'It takes Pluto 246.04 Earth years to orbit the Sun.',
    'The New Horizons mission has verified that Pluto is a dwarf planets with a diameter 2,370 kilometres.',
    'Pluto has five moons, in order of size they are Charon with a diameter of 1,208 km, Hydra (45 km), Nix (35 km), Kerberos and Styx.'],
};

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    HelloIntentHandler,
    GetNewFactHandler,
    HelpHandler,
    FallbackHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
