const colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'k', 'l', 'm', 'n', 'o', 'r', '&']
const convertColor = ['black', 'dark_blue', 'dark_green', 'dark_cyan', 'dark_red', 'dark_purple', 'gold',
      'gray', 'dark_gray', 'blue', 'green', 'aqua', 'red', 'light_purple', 'yellow', 'white',
      'random', 'bold', 'strikethrough', 'underlined', 'italic', 'reset', '&']
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
    
    sendPacketsAll = (serv) => {
        serv.players.forEach((element) => {
            this.sendPackets(element);
        })
    }
    
    updateTitle = (newTitle, player) => {
        this.title = newTitle;
      this.sendPackets(player)
    }
    
    updateTitleAll = (newTitle, serv) => {
      this,title = newTitle;
      serv.players.forEach((element) => {
          this.sendPackets(element);
        })
    }
    
    addObjective = (newObj) => {
        this.objectives.push(newObj);
    }
    
    removeObjective = (name) => {
        this.objectives.forEach((element, index) => {
            if(element.name == name) {
                this.objectives.delete(index)
            }
        })
    }
    
    updateObjective = (name, value) => {
        this.objectives.forEach((element, index) => {
        if(element.name == name) {
            this.objectives[index].value = value;
        }
    })
    }
}

module.exports.Scoreboard = Scoreboard;
module.exports.sbColor = (acolor) => {
    return "§" + colors[convertColor.indexOf(acolor)]
}
module.exports.formattedDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}
