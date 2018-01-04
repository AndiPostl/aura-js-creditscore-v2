var SCORE_MAX = 800;
var SCORE_MIN = 550;
var util = require('util');

/*
 * POST scoring.
 */

exports.score = function(req, res){
  if (req.is('application/json')) {
	  console.log("JSON");
	  console.log(req.body);
	  var person = JSON.parse(JSON.stringify(req.body));
	  var firstname = person.firstname,
	      lastname = person.lastname,
	      dateofbirth = person.dateofbirth,
	      ssn = person.ssn;
  } else {

	  console.log('Request body: ' + util.inspect(req.body));
	  var firstname = req.body.firstname,
	      lastname = req.body.lastname,
	      dateofbirth = req.body.dateofbirth,
	      ssn = req.body.ssn;
  }  
  var score = firstname.hashCode() + lastname.hashCode() + dateofbirth.hashCode() + ssn.hashCode();
  
  score = score % SCORE_MAX;
  
  while (score < SCORE_MIN) {
	score = score + 100;
  }  
  
  var resultData = { "firstname": firstname, 
		  "lastname": lastname,
          "ssn": ssn,
          //"ssn": "999-99-9999",
		  "dateofbirth": dateofbirth, 
		  "score": score
		};

  
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resultData));
};

/*
 * Hashcode for String.
 */

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) {
	  return hash;
  }
  for (i = 0; i < this.length; i++) {
	/*jslint bitwise: true */
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

/*
 * GET list of all scores. In this version we don't persist any scores so there is nothing to return
 */

exports.list = function(req, res){
    if (req.is('application/json')) {
        console.log("JSON");
        console.log(req.body);
        // var person = JSON.parse(JSON.stringify(req.body));
        // var firstname = person.firstname,
        //     lastname = person.lastname,
        //     dateofbirth = person.dateofbirth,
        //     ssn = person.ssn;
    } else {

        console.log("NOT JSON");
        console.log(req.body);
        // console.log('Request body: ' + util.inspect(req.body));
        // var firstname = req.body.firstname,
        //     lastname = req.body.lastname,
        //     dateofbirth = req.body.dateofbirth,
        //     ssn = req.body.ssn;
    }

    var resultData = {
        "SERVICE VERSION": "aura-js-creditscore V2",
        "MESSAGE": "NO SCORES - (SAVE NOT IMPLEMENTED IN aura-js-creditscore V2)"
    };


    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(resultData));
};

