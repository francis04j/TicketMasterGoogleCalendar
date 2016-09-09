var tm = require('ticketmaster');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
 
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), addEvent);
});


function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
     oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

function addEvent(auth)
{
	var myArtist = {};
var myTMevent = {};

tm('XfbgzZ1QYJ2jfu55eBtZs62RGtLo9oqf').discovery.v2.event.all(
{
	"keyword":"Mary J Blige",
	"size": "1",
	"City": "London"

}).then(function(result){
		
		myArtist =result.items[0];
		
		myTMevent.summary = myArtist.name;
		myTMevent.location = myArtist._embedded.venues[0].postalCode;
		myTMevent.description = myArtist.url;
		myTMevent.start = {'dateTime': calendarEvent.sales.public.startDateTime, 'timeZone': 'Europe/London'};
		myTMevent.end = {'dateTime':calendarEvent.sales.public.endDateTime, 'timeZone': 'Europe/London'};
		var reminder = {'useDefault': true};
		myTMevent.reminders = reminder;		
var calendar = google.calendar('v3');
	calendar.events.insert({
  auth: auth,
  calendarId: 'primary',
  resource: myTMevent,
}, function(err, myTMevent) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', myTMevent.htmlLink);
});	
		
});
}








var myEvent = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};
var calendarEvent= { name: 'BluesFest - Maxwell & Mary J Blige',
  type: 'event',
  id: '17u8v8G65lY9lus',
  test: false,
  url: 'http://ticketmaster.co.uk/event/350050BAF05EB371',
  locale: 'en-us',
  images:
   [ { ratio: '16_9',
       url: 'http://s1.ticketm.net/dam/c/7be/4e1e9428-29ec-401f-aa45-f1577614b7be_105421_TABLET_LANDSCAPE_16_9.jpg',
       width: 1024,
       height: 576,
       fallback: true },
     { ratio: '16_9',
       url: 'http://s1.ticketm.net/dam/c/7be/4e1e9428-29ec-401f-aa45-f1577614b7be_105421_RETINA_LANDSCAPE_16_9.jpg',
       width: 1136,
       height: 639,
       fallback: true },
     { ratio: '3_2',
       url: 'http://s1.ticketm.net/dam/c/7be/4e1e9428-29ec-401f-aa45-f1577614b7be_105421_RETINA_PORTRAIT_3_2.jpg',
       width: 640,
       height: 427,
       fallback: true },
     { ratio: '16_9',
       url: 'http://s1.ticketm.net/dam/c/7be/4e1e9428-29ec-401f-aa45-f1577614b7be_105421_EVENT_DETAIL_PAGE_16_9.jpg',
       width: 205,
       height: 115,
       fallback: true },
     { ratio: '3_2',
       url: 'http://s1.ticketm.net/dam/c/7be/4e1e9428-29ec-401f-aa45-f1577614b7be_105421_ARTIST_PAGE_3_2.jpg',
       width: 305,
       height: 203,
       fallback: true },
     { ratio: '16_9',
       url: 'http://s1.ticketm.net/dam/c/7be/4e1e9428-29ec-401f-aa45-f1577614b7be_105421_RECOMENDATION_16_9.jpg',
       width: 100,
       height: 56,
       fallback: true },
     { ratio: '16_9',
       url: 'http://s1.ticketm.net/dam/c/7be/4e1e9428-29ec-401f-aa45-f1577614b7be_105421_RETINA_PORTRAIT_16_9.jpg',
       width: 640,
       height: 360,
       fallback: true },
     { ratio: '3_2',
       url: 'http://s1.ticketm.net/dam/c/7be/4e1e9428-29ec-401f-aa45-f1577614b7be_105421_TABLET_LANDSCAPE_3_2.jpg',
       width: 1024,
       height: 683,
       fallback: true },
     { ratio: '4_3',
       url: 'http://s1.ticketm.net/dam/c/7be/4e1e9428-29ec-401f-aa45-f1577614b7be_105421_CUSTOM.jpg',
       width: 305,
       height: 225,
       fallback: true },
     { ratio: '16_9',
       url: 'http://s1.ticketm.net/dam/c/7be/4e1e9428-29ec-401f-aa45-f1577614b7be_105421_TABLET_LANDSCAPE_LARGE_16_9.jpg',
       width: 2048,
       height: 1152,
       fallback: true } ],
  sales:
   { public:
      { startDateTime: '2016-07-28T08:00:00Z',
        startTBD: false,
        endDateTime: '2016-10-28T18:00:00Z' },
     presales: [ [Object] ] },
  dates:
   { start:
      { localDate: '2016-10-28',
        localTime: '19:00:00',
        dateTime: '2016-10-28T18:00:00Z',
        dateTBD: false,
        dateTBA: false,
        timeTBA: false,
        noSpecificTime: false },
     timezone: 'Europe/London',
     status: { code: 'onsale' } },
  classifications:
   [ { primary: true,
       segment: [Object],
       genre: [Object],
       subGenre: [Object] } ],
  promoter:
   { id: '4110',
     name: 'LIVE NATION (MUSIC) LTD',
     description: 'LIVE NATION (MUSIC) LTD / NTL / GBR' },
  pleaseNote: 'PLEASE NOTE Seats located on Level 4 (Upper Tier, Upper Bowl) are not recommended for those who have a fear of heights. **Floor Seating is not raked and other customers might stand during the performance** **Letters of authorisation will not be accepted at the venue when collecting tickets for events at the O2. If collecting from the box office, the card holder must be present** **Children aged 14 and under must be accompanied by an adult aged 18 or over**',
  _links:
   { self: { href: '/discovery/v2/events/17u8v8G65lY9lus?locale=en-us' },
     attractions: [ [Object], [Object], [Object] ],
     venues: [ [Object] ] },
  _embedded:
   { venues: [ [Object] ],
     attractions: [ [Object], [Object], [Object] ] } };