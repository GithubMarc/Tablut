var ws = null;

var serverAddr = "172.30.1.1"
var httpPort = "8000"
var serverPath = "/tablutWebService/connexion"
var socketServerPath = "/tablutWebService/getWebSocketAddr"
var wait = true;



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
            //connectWebServer(myArr.addresse ,myArr.wsport);
		}
	};
    xmlHttp.open( "GET", "http://" + addr + ":" + port + path , true ); // false for synchronous request
	xmlHttp.setRequestHeader('Content-Type', 'application/json');
	xmlHttp.send();
}

function onMessageHTTP(jsonParse){
    console.log(JSON.stringify(jsonParse));
	if("succes" in jsonParse)
	{
		switch(jsonParse["succes"])
		{
			case "connexion":
                console.log(jsonParse["succes"]);
                wait = false;
				break;
			case "deconnexion":
				console.log(jsonParse["succes"]);
				break;
			case "utilisateur_cree":
				console.log(jsonParse["succes"]);
				break;
			case "webSocketAddr":
                console.log(jsonParse["succes"]);
                mainForm.playPage.wsClient.active = true;
                mainForm.playPage.wsClient.url = "ws://" + jsonParse["addresse"] + ":" + jsonParse["wsport"];
                mainForm.state = "base state";
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

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
	if ((new Date().getTime() - start) > milliseconds){
	  break;
	}
  }
}
