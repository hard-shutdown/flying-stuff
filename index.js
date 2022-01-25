var utils = require('./utils.js')
module.exports.player = function(player, serv) {
  player.on('connected', () => { // Say hey to the user!

    //player.chat(`Welcome to a ${serv.color.green}Flying Squid Server${serv.color.reset}!`);
    //var newScore = new utils.Scoreboard("FLYING-SQUID", [{name: utils.sbColor("grey") + utils.formattedDate(), value: 20}]);
    //newScore.sendPackets(player)
  });
}

module.exports.server = function(serv) {

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
      if(ctx.player) ctx.player.chat(number); // If context of the player send it to him
      else serv.log(number); // If not, log it.
    }
  })
}
