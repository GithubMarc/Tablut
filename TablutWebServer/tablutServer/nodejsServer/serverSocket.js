// Recupere la librairie webSocket
var WebSocketServer = require('ws').Server;
var partieMod = require('./Partie.js');
var listWsClient = [];
var matchStatus = {};
matchStatus["1"] = new partieMod("1");
/*matchStatus["1"] = {};
matchStatus["1"]["red"] = null;
matchStatus["1"]["black"] = null;*/

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
		playerInit(ws);
		console.log("client connected !");
		
		// Dès qu'on reçoit un message
		ws.onmessage = function(message){
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

		ws.on('close', function(){
			var tmp = -1;
			for(var i in listWsClient)
			{
				if(listWsClient[i] == ws)
				{
					tmp = i;
				}
			}

			//reprendre quand amélioration TAG LHI
			if(matchStatus["1"].black == ws)
			{
				matchStatus["1"].black = null
			}
			else if(matchStatus["1"].red == ws)
			{
				matchStatus["1"].red = null
			}

			console.log("deconnexion de " + tmp);
			listWsClient.splice(tmp, 1);
		});

		ws.on('open', function() {
			console.log("connected");
		});
	});
}


function playerInit(ws)
{

	listWsClient.push(ws);

	//reprendre quand amélioration TAG LHI
	if (matchStatus["1"].black == null)
	{
		try
		{
			matchStatus["1"].black = ws
			ws.send('{"init":{"idPartie":1, "equipe":"black", "tour":"black", "statutPartie":"starting"}}');	
		}
		catch(err)
		{
			console.log("black");
		}
	}
	else if (matchStatus["1"].red == null)
	{
		try
		{
			matchStatus["1"].red = ws
			ws.send('{"init":{"idPartie":1, "equipe":"red", "tour":"black", "statutPartie":"starting"}}');
		}
		catch(err)
		{
			console.log("red");
		}
	}
	else
	{
		try
		{
			ws.send('{"init":{"idPartie":1, "equipe":"spectateur", "tour":"black", "statutPartie":"starting"}}');
		}
		catch(err)
		{
			console.log("spectateur");
		}
	}
}


launchSocketServer()

loop()