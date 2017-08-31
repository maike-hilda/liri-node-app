// At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
// Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

var fs = require("file-system");
var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");


//note: somehow this is not showing my twitter account data
var twitterClient = new twitter({
    consumer_key: ' eZ1ELHeEs63GXKDb9Xi82nZJj',
    consumer_secret: 'ExrdHFPgwj46sufTwUwARzoWZ8iUNVkFTVlQ6FXf9Usip6htMP'
  ,
    access_token_key: '900576550726246400-US84KWPeqe3AgE2M6HOTDABL5RpcXiY',
    access_token_secret: '1RjVPEKFTgeTM9MOu8dpNo4HROXlJpQZDCsZBBsdEYIO1',
});

// fs.readFile('keys.js', 'utf8', function (err, data) {
//     if (err) {
//         return console.log(err);
//     };
//     //console.log(data);
//     var dataArray = data.split("'");
//     //console.log(dataArray);
//     twitterClient.consumer_key = dataArray[3];
//     twitterClient.consumer_secret = dataArray[5];
//     twitterClient.access_token_key = dataArray[7];
//     twitterClient.access_token_secret = dataArray[9];
// });

var command = process.argv[2];

if (command === "my-tweets") {
    var params = {
        count: 20,
        screen_name: 'nodejs'
    };
    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
      }
      for (var i = 0; i < tweets.length; i++) {
        var output = 
        "Tweet: " + tweets[i].text + 
        "Timestamp: " + tweets[i].created_at;

        console.log(output);
    }
    });
}

if (command === "spotify-this-song") {
    var track = process.argv[3];
    spotify.search({ type: 'track', query: track }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data); 
    });
}

const imdb = require('imdb-api');

if (command === "movie-this") {
    var movie = process.argv[3];
    imdb.get(movie, {
        apiKey: '40e9cece', 
        timeout: 30
    }).then(console.log).catch(console.log);
}
    
if (command === "do-what-it-says") {
    fs.readFile('keys.js', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    };
        var dataArray = data.split(",");
        spotify.search({ type: 'track', query: dataArray[1] }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log(data); 
        });
    });
}
    