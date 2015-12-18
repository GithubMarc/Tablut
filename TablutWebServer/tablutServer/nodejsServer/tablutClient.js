ws = null
var WebSocket = require('ws');
var XMLHttpRequest = require('xhr2');
var document = require('document');

var serverAddr = "172.30.1.1"
var httpPort = "8000"
var serverPath = "/tablutWebService/connexion"



function POSTHttpTest(url, path, port, sendMessage){
	var xmlHttp = new XMLHttpRequest();
	var message = JSON.stringify(sendMessage);
	xmlHttp.onreadystatechange = function() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var myArr = JSON.parse(xmlHttp.responseText);
			console.log(myArr);
			var toto = xmlHttp.getAllResponseHeaders();
			console.log(toto);
			var tata = xmlHttp.getResponseHeader('vary');
			console.log(tata);
		}
	};

	console.log("http://" + url + ":" + port + path);
	xmlHttp.open("POST", "http://"+ url + ":" + port + path, true); // false for synchronous request
	xmlHttp.setRequestHeader("Content-type", "application/json");
	xmlHttp.send(message);
}

/**
* Fonction qui envoi une requete HTTP
* Récupère au format JSON l'adresse ip et le port de connexion pour la Web Socket
* Url pour la requete HTTP
* Port pour la requete HTTP
*/
function GETHttpRequestServer(url, path, port){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var myArr = JSON.parse(xmlHttp.responseText);
			Connect(myArr.addresse ,myArr.wsport);
		}
	};
	xmlHttp.open( "GET", "http://" + url + path + ":" + port, true ); // false for synchronous request
	xmlHttp.setRequestHeader('Content-Type', 'application/json');
	xmlHttp.send();
}

/**
* Création d'une websocket et tentative de connexion à une url
*/
function Connect(ipServer, portServer)
{	
	console.log("toto");
	// Verifie que l'ip et le port du serveur est renseigné si non on sort de la fonction
	if (ipServer == "" || portServer == "")	return;

	// Formate l'uri de connexion pour la websocket
	var uri = "ws://"+ipServer+":"+portServer;

	// Si l'objet ws n'est pas vide, c'est qu'il y a une connexion existante
	if(null != ws)
	{
		console.log("Vous etes deja connecte.");
	}
	
	try
	{
		console.log("Tentative de connexion a " + uri);
		
		ws = new WebSocket(uri);


		console.log(ReadyState(ws.readyState));
		
		// Fonction exécutée lorsque la socket est ouverte
		ws.onopen = function()
		{
			console.log(ReadyState(ws.readyState));
			Send('{"enContinue": "test"}');
		};

		// Fonction exécutée lorsque la socket est fermée
		ws.onclose = function(e)
		{
			console.log(ReadyState(ws.readyState));
			if(e.wasClean)
			{
				console.log("Connexion proprement terminee.");
			}
			else
			{
				console.log(e.reason);
				console.log("Connexion terminee.");
				// Efface les stacks
				$('.stack').remove(); 
				// Recharge la page
				location.reload();
			}

			// Réinitialisation de l'objet websocket
			ws = null;
		};

		// Fonction qui est exécutée lorsqu'une erreur se produit
		ws.onerror = function(e)
		{
			console.log(e);
			console.log("Une erreur est survenue.");
		};

		// Fonction exécutée lorsqu'un message est reçu dans la socket
		ws.onmessage = function(e)
		{
			if(e.data!="")
			{
				json=JSON.parse(e.data);
				console.log("Recu> " + json);


				// Reception correcte
				return true;
			}else
			{
				console.log("Une erreur est survenue.");
			}
		};
	}
	catch(str)
	{	
		console.log("WebSocketError"); // Affichage de l'erreur critique
	}

	// Erreur survenu dans la fonction
	return false;
}

/**
* Fonction qui ferme la connexion. Cela peut prendre effet à retardement
*/
function Close()
{
	if(null === ws)
	{
		console.log("Vous n'etes pas connecte.");
		return;
	}
	ws.close();
	console.log(ReadyState(ws.readyState));
}

/**
* Envoi le message à la socket vers le serveur
*/
function Send(text)
{
	if(null === ws)
	{
		console.log("Vous n'etes pas connecte.");
		return;
	}
	// Envoi du message texte
	console.log("Envoye> " + text);
	text = JSON.stringify(text)
	ws.send(text);
}

function ReadyState(int_val)
{
	switch(int_val)
	{
		case WebSocket.CONNECTING: return "Connexion en cours...";
		case WebSocket.OPEN : return "Connecte !";
		case WebSocket.CLOSING : return "Deconnexion en cours...";
		case WebSocket.CLOSED : return "Deconnecte.";
	}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
	if ((new Date().getTime() - start) > milliseconds){
	  break;
	}
  }
}

POSTHttpTest(serverAddr, serverPath, httpPort, {'login':'lhi', 'password':'123456'});