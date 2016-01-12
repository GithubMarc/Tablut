// Recupere la librairie webSocket
var WebSocketServer = require('ws').Server;
var partieMod = require('./Partie.js');
var listWsClient = [];
var matchStatus = {};
matchStatus["1"] = new partieMod("1");



function postHttpRequestServer(addr, path, port, sendMessage){
	var xmlHttp = new XMLHttpRequest();
	var message = JSON.stringify(sendMessage);
	xmlHttp.onreadystatechange = function() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var myArr = JSON.parse(xmlHttp.responseText);
			onMessageHTTP(myArr);
		}
	};

	console.log("http://" + addr + ":" + port + path);
	xmlHttp.open("POST", "http://"+ addr + ":" + port + path, true); // false for synchronous request
	xmlHttp.setRequestHeader("Content-type", "application/json");
	xmlHttp.send(message);
}

/**
* Fonction qui envoi une requete HTTP
* Récupère au format JSON l'adresse ip et le port de connexion pour la Web Socket
* Url pour la requete HTTP
* Port pour la requete HTTP
*/
function getHttpRequestServer(addr, path, port){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var myArr = JSON.parse(xmlHttp.responseText);
			onMessageHTTP(myArr);
		}
	};
	xmlHttp.open( "GET", "http://"+ addr + ":" + port + path, true); // false for synchronous request
	xmlHttp.setRequestHeader('Content-Type', 'application/json');
	xmlHttp.send();
}

function onMessageHTTP(jsonParse){
	if("succes" in jsonParse)
	{
		switch(jsonParse["succes"])
		{
			case "connexion":
				console.log(jsonParse["succes"]);
				break;
			case "deconnexion":
				console.log(jsonParse["succes"]);
				break;
			case "utilisateur_cree":
				console.log(jsonParse["succes"]);
				break;
			case "webSocketAddr":
				console.log(jsonParse["succes"]);
				break;
			default:
				console.log(jsonParse["succes"] + " erreur");
		}
	}
	else
	{
		console.log(jsonParse["erreur"]);
	}
}

//launch server
function launchSocketServer(){
	wsServer = new WebSocketServer({port: 1337});
	console.log("Web Socket en ecoute sur le port 1337");
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