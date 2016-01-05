// Recupere la librairie webSocket
var WebSocketServer = require('ws').Server;
var listWsClient = [];

//launch server
function launchSocketServer(){
	wsServer = new WebSocketServer({port: 4000});
	console.log("Web Socket en ecoute sur le port 4000");
}

// Boucle contenant les nouvelles connexions et les actions sur les messages
function loop() {// Dès qu'un membre se connecte
	wsServer.on('connection', function(ws) {
		// IP du client
		//lientIp = new String(ws._socket.remoteAddress);
		// Test quel type de client se connecte (arduino ou écran)
		//if (clientIp.valueOf() == arduinoIp.valueOf()) {
		// sauvegarde de la 
		// Envoie des infos aux 			
		// Si c'est un ecran
		listWsClient.push(ws);
		console.log("client connected !");
		
		// Dès qu'on reçoit un message
		ws.onmessage = function(message){ 
		//ws.on('message', function(message) {
			// Traitement de l'action en fonction du message
			var i = 0;
			try {
				message.data = JSON.parse(message.data)
				while (i < listWsClient.length) {
					try {
						//listWsClient[i].send(message.data);
						listWsClient[i].send(JSON.stringify(message.data));
						console.log(message.data);
					} catch(err) {
						listWsClient.splice(i, 1);
						i--;
					}
					i++;
				}
			} catch(err) {
				console.log("json error " + message.data)
			}
		};

		ws.on('open', function() {
			console.log("connected");
		});
	});
}



launchSocketServer()

loop()