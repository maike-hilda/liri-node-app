//get keys
var keys = require("./keys.js");
var fs = require("fs");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");

var command = process.argv[2];

switch(command) {
    case "my-tweets":
        tweets();
        break;
    
    case "spotify-this-song":
        spotify(process.argv[4]);
        break;
    
    case "movie-this":
        movie();
        break;
    
    case "do-what-it-says":
        file();
        break;
    
    default:
        console.log("Your command is invalid.");
        console.log("The following commands are possible: ");
        console.log("my-tweets");
        console.log("spotify-this-song");
        console.log("movie-this");
        console.log("do-what-it-says");
}

function tweets() {
    console.log(keys.twitterKeys.consumer_key);
    var client = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    var params = {
        count: 20,
        screen_name: 'nodejs'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        //console.log(tweets);
      }
      for (var i = 0; i < tweets.length; i++) {
        var output = 
        "Tweet: " + tweets[i].text + 
        "Timestamp: " + tweets[i].created_at;

        console.log(output);
    }
    });

    // client.get('favorites/list', function(err, tweets, res) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log(tweets);  // The favorites. 
    //     //console.log(res);  // Raw response object. 
    // });
};

function spotify(song) {
    var client = new spotify({
        id: keys.spotify.consumer_key,
        secret: keys.spotifyKeys.consumer_secret
      });
       
      spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
};

function movie() {
    //get movie name
    var movieName = process.argv[3];
    for (var i = 4; i < process.argv.length; i++) {
        movieName += "+" + process.argv[i];    
    }

    //assemble url
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    console.log(queryUrl);

    //run request
    request(queryUrl, function(err, res, body) {
        // If the request is successful
        if (!err && res.statusCode === 200) {
            var movieData = JSON.parse(body);
            console.log("Title of the movie: " + movieData.Title);
            console.log("Year the movie came out: " + movieData.Year);
            console.log("ImDB Rating: " + movieData.imdbRating);
            console.log("Rotten Tomatoes: " + movieData.Ratings[2].Value);
            console.log("Country of origin: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
        }
    });
};

function file() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        var data = data.split(",");
        var song = data[1].split('"');
        song = song[1];
        spotify(song);;
    });
};
