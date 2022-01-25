module.exports.player = function(player, serv) {
  player.on('spawned', () => { // Say hey to the user!
    player.chat(`Welcome to a ${serv.color.green}Flying Squid Server${serv.color.reset}!`);
  });
}

module.exports.server = function(serv) {
  // Commands are added there only.
  serv.commands.add({
    base: 'random', // This is what the user starts with, so in this case: /random
    info: 'Returns a random number from 0 to num', // Description of the command
    usage: '/random <num>', // Usage displayed if parse() returns false (which means they used it incorrectly)
    parse(str) { // str contains everything after "/random "
      const match = str.match(/^\d+$/); // Check to see if they put numbers in a row
      if (!match) return false; // Anything else, show them the usage
      else return parseInt(match[0]); // Otherwise, pass our number as an int to action()
    },
    action(maxNumber, ctx) { // ctx - context who is using it
	  
      const number = Math.floor(Math.random()*(maxNumber+1)); // Generate our random number
      if(ctx.player) {
		    ctx.player.chat(`${serv.color.green}Your Random Number is: ${serv.color.reset}` + number); 
        var score = new Scoreboard("FLYING-SQUID", [{name: "testing", value: 100}, {name: "testing again", value: 20}]);
        score.sendPackets(ctx.player)
        var interval = setInterval(() => {
          var randomProperty = function (obj) {
            var keys = Object.keys(obj);
            return obj[keys[ keys.length * Math.random() << 0]];
          };
          score.updateTitle(`${randomProperty(serv.color).replace("&", "§")}FLYING-SQUID`, ctx.player)
        }, 500);
      } else serv.log(number); // If not, log it.
    }
  })
  serv.commands.add({
    base: 'sendpacket', // This is what the user starts with, so in this case: /random
    info: 'Returns a random number from 0 to num', // Description of the command
    usage: '/random <num>', // Usage displayed if parse() returns false (which means they used it incorrectly)
    action(maxNumber, ctx) { // ctx - context who is using it
      var a = maxNumber.split(":::")[0]
      var b = maxNumber.split(":::")[1]
      console.log(a, b)
	  
      ctx._client.write(a, JSON.parse(b))
    }
  })
}

class Scoreboard {
  constructor(title, objectives) {
    this.title = title;
    this.objectives = objectives;
  }
  getPackets = () => {
    var object = {
      scoreboard_objective: {name: this.title, action: 0, displayText: this.title, type: "integer"},
      scoreboard_score: [],
      scoreboard_display_objective: {position: 1, name: this.title}
    };
    this.objectives.forEach(element => {
      object.scoreboard_score.push({itemName: element.name, action: 0, scoreName: this.title, value: element.value})
    });
    return object;
  }

  sendPackets = (player) => {
    var packets = this.getPackets();
    //player._client.write("scoreboard_team", {team: "abc", mode: 0, name: "abc", prefix: " ", suffix: "", friendlyFire: 3, nameTagVisibility: "always", color: 11, players: [ctx.player.username]})
    player._client.write("scoreboard_objective", packets.scoreboard_objective)
    packets.scoreboard_score.forEach((element) => {
      player._client.write("scoreboard_score", element)
    })
    player._client.write("scoreboard_display_objective", packets.scoreboard_display_objective)
  }

  updateTitle = (newTitle, player) => {
    this.title = newTitle;
    this.sendPackets(player)
  }
}
