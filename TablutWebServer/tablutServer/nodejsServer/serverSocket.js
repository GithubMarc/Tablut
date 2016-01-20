// Recupere la librairie webSocket
var WebSocketServer = require('ws').Server;
var XMLHttpRequest = require('xhr2');
var partieMod = require('./Partie.js');
var listWsClient = [];
var matchStatus = {};
matchStatus["1"] = new partieMod("1");
var httpAddr = "172.30.1.1"
var httpPort = "8000"

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
		playerConnection(ws);
		console.log("client connected !");
		
		// Dès qu'on reçoit un message
		ws.onmessage = function(message){
			// Traitement de l'action en fonction du message
			var new_message = JSON.parse(message.data);
			messageReceived(new_message);
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
			else
			{
				for(var j in listWsClient)
				{
					if(matchStatus["1"].viewers_list[j] == ws)
					{
						matchStatus["1"].viewers_list.splice(j, 1)
					}
				}
			}
			console.log("deconnexion de " + tmp);
			listWsClient.splice(tmp, 1);
		});

		ws.on('open', function() {
			console.log("connected");
		});
	});
}

function messageReceived(messageJson)
{
	// Traitement de l'action en fonction du message
	var i = 0;
	try 
	{
		while (i < listWsClient.length)
		{
			console.log(messageJson);
			if('restart' in messageJson)
			{
				getHttpRequestServer(httpAddr, httpPort, "/tablutWebService/reset/1", null);
			}
			else if (!("message" in messageJson || 'restart' in messageJson))
			{
				listWsClient[i].send(JSON.stringify(messageJson));
				postHttpRequestServer(httpAddr, httpPort, "/tablutWebService/updateMatch", messageJson, null);
			}
			i++;
		}
	} catch(err) {
		console.log("json error " + message.data)
	}
}

function playerConnection(ws)
{
	var id = "1"
	listWsClient.push(ws);
	console.log("connected client");
	if (matchStatus["1"].black == null)
	{
		try
		{
			matchStatus["1"].black = ws
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
			matchStatus["1"].viewers_list.push(ws);
		}
		catch(err)
		{
			console.log("spectateur");
		}
	}
	getHttpRequestServer(httpAddr, httpPort, "/tablutWebService/match/" + id, ws);
}

function onMessageHTTP(jsonParse, ws)
{
	if("init" in jsonParse)
	{
		playerInit(jsonParse, ws);
	}
	else if("succes" in jsonParse)
	{
		if(jsonParse["succes"] == "reset")
		{
			for(var i in listWsClient)
			{	
				console.log(jsonParse);
				console.log(jsonParse["send"]);
				//playerInit(jsonParse["send"], listWsClient[i]);
			}
		}
	}
	else
	{
		console.log(jsonParse["erreur"]);
	}
}

function playerInit(jsonParse, ws)
{
	//reprendre quand amélioration TAG LHI
	if (matchStatus["1"].black == ws)
	{
		try
		{
			jsonParse["init"]["equipe"] = "black";
		}
		catch(err)
		{
			console.log("black");
		}
	}
	else if (matchStatus["1"].red == ws)
	{
		try
		{
			jsonParse["init"]["equipe"] = "red";
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
			jsonParse["init"]["equipe"] = "spectateur";
		}
		catch(err)
		{
			console.log("spectateur");
		}
	}
	ws.send(JSON.stringify(jsonParse));
}

function postHttpRequestServer(addr, port, path, sendMessage, ws){
	var xmlHttp = new XMLHttpRequest();
	var message = JSON.stringify(sendMessage);
	xmlHttp.onreadystatechange = function() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var myArr = JSON.parse(xmlHttp.responseText);
			onMessageHTTP(myArr, ws);
		}
	};

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
function getHttpRequestServer(addr, port, path, ws)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var myArr = JSON.parse(xmlHttp.responseText);
			onMessageHTTP(myArr, ws);
		}
	};
	xmlHttp.open( "GET", "http://"+ addr + ":" + port + path, true); // false for synchronous request
	xmlHttp.setRequestHeader('Content-Type', 'application/json');
	xmlHttp.send();
}

launchSocketServer()

loop()