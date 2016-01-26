// Recupere la librairie webSocket
var WebSocketServer = require('ws').Server;
var XMLHttpRequest = require('xhr2');
var partieMod = require('./Partie.js');
var listWsClient = [];
var matchStatus = {};
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
			messageReceived(new_message, ws);
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
			for(var k in matchStatus[j])
			{
				if(matchStatus[k].black == ws)
				{
					matchStatus[k].black = null
				}
				else if(matchStatus[k].red == ws)
				{
					matchStatus[k].red = null
				}
				else
				{
					for(var j in listWsClient)
					{
						if(matchStatus[k].viewers_list[j] == ws)
						{
							matchStatus[k].viewers_list.splice(j, 1)
						}
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

function messageReceived(messageJson, ws)
{
	// Traitement de l'action en fonction du message
	var i = 0;
	try 
	{
		console.log(messageJson);
		if('end' in messageJson)
		{
			if(messageJson['end'] == "new game" || messageJson['end'] == "switch team")
			{
				if ('end' in messageJson && messageJson['end'] == "switch team")
				{
					var tmpred = matchStatus[messageJson["idPartie"].toString()].red;
					matchStatus[messageJson["idPartie"].toString()].red = matchStatus[messageJson["idPartie"].toString()].black;
					matchStatus[messageJson["idPartie"].toString()].black = tmpred;
				}
				getHttpRequestServer(httpAddr, httpPort, "/tablutWebService/nameMatch/"+messageJson["idPartie"].toString(), null);
			}
			else if (messageJson['end'] == "menu")
			{
				sendToAll(messageJson);
				getHttpRequestServer(httpAddr, httpPort, "/tablutWebService/reset1/"+messageJson["idPartie"].toString(), null);
			}
		}
		else if ('connexion' in messageJson) 
		{

			if(messageJson['connexion'].toString() in matchStatus)
			{
				if (matchStatus[messageJson['connexion'].toString()].black == null)
				{
					matchStatus[messageJson['connexion'].toString()].black = ws;
				}
				else if (matchStatus[messageJson['connexion'].toString()].red == null)
				{
					matchStatus[messageJson['connexion'].toString()].red = ws;
				}
				else
				{
					matchStatus[messageJson['connexion'].toString()].viewers_list.push(ws);
				}
			}
			else
			{
				matchStatus[messageJson['connexion'].toString()] = new partieMod(messageJson['connexion']);
				matchStatus[messageJson['connexion'].toString()].black = ws;
			}
			getHttpRequestServer(httpAddr, httpPort, "/tablutWebService/match/" + messageJson['connexion'], ws);

		}
		else if (!("message" in messageJson || 'end' in messageJson || 'connexion' in messageJson))
		{
			var idPartie = 0
			for(var i in messageJson)
			{
				if('idPartie' in messageJson[i])
				{
					idPartie = messageJson[i]['idPartie']
				}
			}
			sendToAll(messageJson, idPartie);
			postHttpRequestServer(httpAddr, httpPort, "/tablutWebService/updateMatch", messageJson, null);
		}
	}
	catch(err) 
	{
		console.log(err);
		console.log("json error " + JSON.stringify(messageJson));
	}
}

function sendToAll(jsonParse, idPartie)
{
	if(idPartie == false)
	{
		for(var i in listWsClient)
		{
			listWsClient[i].send(JSON.stringify(jsonParse));
		}
	}
	else
	{
		if(matchStatus[idPartie.toString()].black != null)
		{
			matchStatus[idPartie.toString()].black.send(JSON.stringify(jsonParse));
		}
		if(matchStatus[idPartie.toString()].red != null)
		{
			matchStatus[idPartie.toString()].red.send(JSON.stringify(jsonParse));
		}
		for(var i in matchStatus[idPartie.toString()].viewers_list)
		{
			matchStatus[idPartie.toString()].viewers_list[i].send(JSON.stringify(jsonParse));
		}
	}
}

function playerConnection(ws)
{
	listWsClient.push(ws);
	console.log("connected client");
	ws.send(JSON.stringify({"succes":"connexion"}));
}

function onMessageHTTP(jsonParse, ws)
{
	if("init" in jsonParse)
	{
		playerInit(jsonParse, ws);
	}
	else if ("nomMatch" in jsonParse)
	{
		var messageJson = {};
		messageJson["name"] = jsonParse["nomMatch"]["nom"]
		messageJson["gameType"] = jsonParse["nomMatch"]["typeMatch"]
		postHttpRequestServer(httpAddr, httpPort, "/tablutWebService/newMatch/"+jsonParse["nomMatch"]["idPartie"], messageJson, jsonParse["nomMatch"]["idPartie"]);
	}
	else if("succes" in jsonParse)
	{
		if(jsonParse["succes"] == "reset")
		{
			matchStatus[jsonParse["send"]["init"]["idPartie"].toString()] = partieMod(jsonParse["send"]["init"]["idPartie"]);
			matchStatus[jsonParse["send"]["init"]["idPartie"].toString()].black = matchStatus[ws.toString()].black;
			matchStatus[jsonParse["send"]["init"]["idPartie"].toString()].red = matchStatus[ws.toString()].red;
			matchStatus[jsonParse["send"]["init"]["idPartie"].toString()].viewers_list = matchStatus[ws.toString()].viewers_list;
			delete matchStatus[ws.toString()];
			sendToAll(jsonParse["send"], jsonParse["send"]["init"]["idPartie"]);
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
	if (matchStatus[jsonParse["init"]["idPartie"].toString()].black == ws)
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
	else if (matchStatus[jsonParse["init"]["idPartie"].toString()].red == ws)
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