var fs = require("fs")
var vm = require('vm')

// Include de la bibliotheque dijkstra.js
var content = fs.readFileSync("./tablutClient.js");
vm.runInThisContext(content);


Connect("172.30.1.1","4000");