/*Json structure for a transformer

var transformerSample will be a collection of transformer's
*/

var transformerSample = [{
    name: "Soundwave",
    team: "D",
    strength: 8,
    intelligence: 9,
    speed: 2,
    endurance: 6,
    rank: 7,
    courage: 5,
    firepower: 6,
    skill: 10
},
{
    name: "Bluestreak",
    team: "A",
    strength: 6,
    intelligence: 6,
    speed: 7,
    endurance: 9,
    rank: 5,
    courage: 2,
    firepower: 9,
    skill: 7
},
{
    name: "Hubcap",
    team: "A",
    strength: 4,
    intelligence: 4,
    speed: 4,
    endurance: 4,
    rank: 4,
    courage: 4,
    firepower: 4,
    skill: 4
}];

var decepticons = [];
var autobots = [];
var decepticonWinCount = 0;
var autobotWinCount = 0;
var maxFights = 0;
var decepticonWinner = [];
var autobotWinner = [];

/* Fucntion to separate the autobots in to two teams */
function separateTransformers(transformers) {
    transformers.forEach(function (transformer) {
        switch (transformer.team) {
            case "D":
                decepticons.push(transformer);
                break;
            case "A":
                autobots.push(transformer);
                break;
            default:
                console.log("Wrong input - Team not found");
        }
    });
}

//Function to sort transformers
function sortTransformers(transformers) {
    transformers.forEach(function (transformer) {
        var overAllRating = calculateOverAllRating(transformer);
        transformer["overAllRating"] = overAllRating;
    }, this);
    transformers.sort(function (a, b) {
        return b.overAllRating - a.overAllRating;
    });

}

//function to calculate overall rating of a transformer
function calculateOverAllRating(transformer) {
    return transformer.strength + transformer.intelligence + transformer.speed + transformer.endurance + transformer.firepower;
}

//autobots fight 1 - 1
function autobotFight(decepticon, autobot) {
    if (decepticon.name === "Optimus Prime") {
        decepticonWinner.push(decepticon.name);
        decepticonWinCount++;
    } else if (autobot.name === "Predaking") {
        autobotWinner.push(autobot.name);
        autobotWinCount++;
    } else {
        var courageDiff = diffAndFind(autobot.courage, decepticon.courage, 4);
        var strengthDiff = diffAndFind(autobot.strength, decepticon.strength, 3);
        if ((courageDiff === strengthDiff) && (courageDiff !== 0)) {
            if (courageDiff === 1) {
                autobotWinCount++
                autobotWinner.push(autobot.name);
            }
            else if (courageDiff === 2) {
                decepticonWinCount++;
                decepticonWinner.push(decepticon.name);
            }
        } else if (autobot.skill - decepticon.skill >= 3) {
            autobotWinCount++;
            autobotWinner.push(autobot.name);
        } else if (decepticon.skill - autobot.skill >= 3) {
            decepticonWinCount++;
            decepticonWinner.push(decepticon.name);
        } else {
            if (autobot.overAllRating > decepticon.overAllRating) {
                autobotWinCount++;
                autobotWinner.push(autobot.name);
            } else if (autobot.overAllRating < decepticon.overAllRating) {
                decepticonWinCount++;
                decepticonWinner.push(decepticon.name);
            }
        }
    }
}

function fight() {
    maxFights = decepticons.length < autobots.length ? decepticons.length : autobots.length;
    var winner;
    for (var i = 0; i < maxFights; i++) {
        winner = autobotFight(decepticons[i], autobots[i]);
    }
}


//Function takes 2 fighter values and a diff value. Returns 1 if fighter1 value is greater than fighter2 by diffValue or more
// returns 2 if fighter 2 value is greater than fighter1 value by diffValue and returns 0 on all other scenarios.
function diffAndFind(fighter1Value, fighter2Value, diffValue) {
    var diff = fighter1Value - fighter2Value;
    if (diff >= diffValue)
        return 1
    else if (diff <= -diffValue)
        return 2
    else return 0
}

function main(transformers) {
    var winningTeamName;
    var winningTeam;
    var remainingMembersOfLossingTeam = [];
    separateTransformers(transformers);
    sortTransformers(decepticons);
    sortTransformers(autobots);
    fight();
    console.log(maxFights + " Fights");
    if (autobotWinCount > decepticonWinCount) {
        winningTeamName = "Autobots";
        winningTeam = autobotWinner;
        if (decepticons.length > maxFights) {
            remainingMembersOfLossingTeam = decepticons.slice(maxFights);
        }
    } else if (autobotWinCount < decepticonWinCount) {
        winningTeamName = "Decepticons";
        winningTeam = decepticonWinner;
        if (autobots.length > maxFights) {
            remainingMembersOfLossingTeam = autobots.slice(maxFights);
        }
    }
    console.log("Winning Team (" + winningTeamName + ") :");
    winningTeam.forEach(function (name) {
        console.log(name);
    })
    console.log("Survivors from Loosing Team :");
    remainingMembersOfLossingTeam.forEach(function (transformer) {
        console.log(transformer.name);
    })
}

main(transformerSample);
