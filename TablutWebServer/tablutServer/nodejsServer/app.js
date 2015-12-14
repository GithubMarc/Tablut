

// Fichier JSON de la carte
//var json ='{"areas":[{"name":"QuartierNord","map":{"weight":{"w":1,"h":1},"vertices":[{"name": "a", "x": 1, "y": 0.4},{"name": "b", "x": 0.1,"y":0.4},{"name": "c", "x": 0.1, "y": 0.6},{"name": "d", "x": 0.5, "y": 0.9}],"streets":[{"name":"ab","path":["a","b"],"oneway":true},{"name":"da","path":["d","a"],"oneway":true},{"name":"cd","path":["c","d"],"oneway":false},{"name":"bd","path":["b","d"],"oneway":false}],"bridges":[{"from":"a","to":{"area":"QuartierSud","vertex":"z"},"weight":2}]}},{"name":"QuartierSud","map":{"weight":{"w":1,"h":1},"vertices":[{"name":"z","x":0,"y":0.4},{"name":"y","x":0.1,"y":0.4},{"name":"w","x":0.1,"y":0.6},{"name":"r","x":1.0,"y":0.9}],"streets":[{"name":"zy","path":["z","y"],"oneway":false},{"name":"yw","path":["y","w"],"oneway":false},{"name":"wr","path":["w","r"],"oneway":false}],"bridges":[{"from":"z","to":{"area":"QuartierNord","vertex":"a"},"weight":2},{"from":"r","to":{"area":"QuartierEst","vertex":"h"},"weight":2}]}},{"name":"QuartierEst","map":{"weight":{"w":1,"h":1},"vertices":[{"name":"h","x":0.0,"y":0.9},{"name":"k","x":0.3,"y":0.7},{"name":"l","x":0.8,"y":0.2}],"streets":[{"name":"hk","path":["h","k"],"oneway":false},{"name":"kl","path":["k","l"],"oneway":false}],"bridges":[{"from":"h","to":{"area":"QuartierSud","vertex":"r"},"weight":2}]}}],"cabInfo":[{"odometer":0,"destination":null,"loc_now":{"area":"QuartierNord","locationType":"vertex","location":"c"},"loc_prior":{"area":"QuartierNord","locationType":"vertex","location":"a"}}],"cabQueue":[]}';
var json ='{"areas" : [{"name": "WEST","map": {"weight": {"w": 0.20, "h": 0.18},"vertices": [{"name": "1","x": 0.05,"y": 0.1},{"name": "2","x": 0.05,"y": 0.05},{"name": "3","x": 0.1,"y": 0.05},{"name": "4","x": 0.1,"y": 0.1},{"name": "5","x": 0.15,"y": 0.15},{"name": "6","x": 0.2,"y": 0.15},{"name": "7","x": 0.2,"y": 0.05}],"streets": [{"name": "Str_A","path": ["1","2"],"oneway": false},{"name": "Str_B","path": ["2","3"],"oneway": false},{"name": "Str_C","path": ["3","4"],"oneway": false},{"name": "Str_D","path": ["4","1"],"oneway": false},{"name": "Str_E","path": ["4","5"],"oneway": true},{"name": "Str_F","path": ["5","6"],"oneway": false},{"name": "Str_G","path": ["3","7"],"oneway": false}],"bridges": [{"from": "6","to": {"area": "CENTER","vertex": "8"},"weight": 0.05},{"from": "7","to": {"area": "CENTER","vertex": "10"},"weight": 0.05}]}},{"name": "CENTER","map": {"weight": {"w": 0.35, "h": 0.18},"vertices": [{"name": "8","x": 0.0,"y": 0.15},{"name": "9","x": 0.1,"y": 0.15},{"name": "10","x": 0.0,"y": 0.05},{"name": "11","x": 0.1,"y": 0.05},{"name": "12","x": 0.15,"y": 0.1},{"name": "13","x": 0.2,"y": 0.15},{"name": "14","x": 0.2,"y": 0.05},{"name": "15","x": 0.25,"y": 0.1},{"name": "16","x": 0.3,"y": 0.15},{"name": "17","x": 0.35,"y": 0.15},{"name": "18","x": 0.35,"y": 0.10},{"name": "19","x": 0.3,"y": 0.05},{"name": "20","x": 0.35,"y": 0.05}],"streets": [{"name": "Str_H","path": ["8","9"],"oneway": false},{"name": "Str_I","path": ["10","11"],"oneway": false},{"name": "Str_J","path": ["9","12"],"oneway": false},{"name": "Str_K","path": ["11","12"],"oneway": false},{"name": "Str_L","path": ["12","13"],"oneway": false},{"name": "Str_M","path": ["12","14"],"oneway": false},{"name": "Str_N","path": ["13","15"],"oneway": false},{"name": "Str_O","path": ["14","15"],"oneway": false},{"name": "Str_P","path": ["15","16"],"oneway": false},{"name": "Str_Q","path": ["15","19"],"oneway": false},{"name": "Str_R","path": ["16","17"],"oneway": false},{"name": "Str_S","path": ["15","18"],"oneway": false},{"name": "Str_T","path": ["19","20"],"oneway": false}],"bridges": [{"from": "8","to": {"area": "WEST","vertex": "6"},"weight": 0.05},{"from": "10","to": {"area": "WEST","vertex": "7"},"weight": 0.05},{"from": "17","to": {"area": "EAST","vertex": "21"},"weight": 0.05},{"from": "18","to": {"area": "EAST","vertex": "22"},"weight": 0.05},{"from": "20","to": {"area": "EAST","vertex": "23"},"weight": 0.05}]}},{"name": "EAST","map": {"weight": {"w": 0.15, "h": 0.18},"vertices": [{"name": "21","x": 0.0,"y": 0.15},{"name": "22","x": 0.0,"y": 0.1},{"name": "23","x": 0.0,"y": 0.05},{"name": "24","x": 0.1,"y": 0.15},{"name": "25","x": 0.1,"y": 0.1},{"name": "26","x": 0.1,"y": 0.05},{"name": "27","x": 0.14,"y": 0.1},{"name": "28","x": 0.14,"y": 0.05}],"streets": [{"name": "Str_U","path": ["21","24"],"oneway": false},{"name": "Str_V","path": ["22","25"],"oneway": false},{"name": "Str_W","path": ["23","26"],"oneway": false},{"name": "Str_X","path": ["24","27"],"oneway": false},{"name": "Str_Y","path": ["25","27"],"oneway": false},{"name": "Str_Z","path": ["26","28"],"oneway": false},{"name": "Str_AA","path": ["25","26"],"oneway": false},{"name": "Str_AB","path": ["27","28"],"oneway": false}], "bridges":[{"from": "21","to": {"area": "CENTER","vertex": "17"},"weight": 0.05},{"from": "22","to": {"area": "CENTER","vertex": "18"},"weight": 0.05},{"from": "23","to": {"area": "CENTER","vertex": "20"},"weight": 0.05}]}}],"cabInfo":[{"odometer":0,"destination":null,"loc_now":{"area":"WEST","locationType":"vertex","location":"1"},"loc_prior":{"area":"WEST","locationType":"vertex","location":"1"}}],"cabQueue":[]}';

var ipServer = "";

// On formattage le json en objet
json=JSON.parse(json);
//On récupère tous les quartiers
var myNeighbourhoods=json["areas"];
//On récupère les cabs
var myCabsInfo=json["cabInfo"];
//On récupère les cabs queue
var myCabsQueue=json["cabQueue"];

// On initialise un tableau pour accueillir les quartiers disponibles
var myAvailableNeighbourhoods=[];

var arduinoCabQueue=0;
var arduinoCabAvailability=1
var wsArduino = null;
var arduinoIp = new String("192.168.1.10"); // IP fixe de l'arduino

var listWsClient = [];
var wsClient = null;
var clientIp; // IP du client

var stdin = process.openStdin();

// Récupère la librairie HTTP
var http = require('http');
var server = null;

// Recupere la librairie webSocket
var WebSocketServer = require('ws').Server;
var wss = null;


// Envoie le 'jsonMessage' à un seul client ecran
function sendCabInfoToScreen(jsonMessage) {
	if (wsClient != null) {
		wsClient.send(JSON.stringify(jsonMessage));
	}
}

// Envoie le 'jsonMessage' à tous les clients ecrans
function sendCabInfoToScreens(jsonMessage) {
	var i = 0;
	while (i < listWsClient.length) {
		try {
			listWsClient[i].send(JSON.stringify(jsonMessage));
		} catch(err) {
			listWsClient.splice(i, 1);
			i--;
		}
		i++;
	}
}

// Envoie un message propriétaire formaté JSON à l'arduino
function sendToArduino() {
	if (wsArduino != null) {
		var message = {distance:myCabsInfo[0].odometer.toString(), stack:arduinoCabQueue.toString(), availability:arduinoCabAvailability.toString()};
		wsArduino.send(JSON.stringify(message));
		//var message = '{"distance":"' + myCabsInfo[0].odometer + '","stack":"' + arduinoCabQueue + '","availability":"' + arduinoCabAvailability + '"}';
		//wsArduino.send(message);
	}
}

// Envoie brodacast à tous les clients (ecran + arduino)
function sendInformationsToRefreshClientsAndArduino() {
	sendCabInfoToScreens(myCabsInfo[0]);
	sendToArduino();
}

// Envoie le deplacement du taxi aux clients
function sendCabInformations(path, index, cabsInfo, cabRequest) {
	drive(path, index, cabsInfo, cabRequest);
	sendInformationsToRefreshClientsAndArduino();
}

// Permet de réaliser une pause dans le programme
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function actionOnMessageReceived(message) {
	//Formattage du message recu en JSON		
	message= JSON.parse(message);
	// Récuperation de l'entete
	var messageType=Object.keys(message)[0];
	// Liste des traitements en fonction de l'entete du message recu
	switch(messageType) {
		// Message provenant des ecrans
		// Traitement du clic sur l'ecran pour ajouter une demande de prise en charge taxi dans la queue
		case 'cabRequest':
			// Ajout de la cabRequest de l'arduino à la liste des cabsRequest
			myCabsQueue.push(message);
			// Recupération du nombre de stacks
			arduinoCabQueue = myCabsQueue.length;
			// Envoie des infos à l'arduino
			sendToArduino();
			// Envoie des infos aux clients
			sendCabInfoToScreens(JSON.parse('{"cabQueue":' + JSON.stringify(myCabsQueue) + '}'));
		break;

		// Message provenant de l'arduino
		// Traitement d'un message quelconque
		case 'message':
			console.log("Messagage received from the arduino : " + JSON.stringify(message["message"]));
		break;
		// Traitement de l'acceptation de la request
		case 'nextStack':
			// Recuperation du code d'acceptation
			var accepted = message["nextStack"];
			// Si request accepted
			if (accepted == 1) {
				// Initialisation de dijkstra : création du modèle de graph = noeuds + aretes + distance + precedent
				dijkstraInit(myNeighbourhoods, myCabsInfo);
				// remise a zero des variables arduinos
				arduinoCabAvailability = 0;
				myCabsInfo[0].odometer = 0;
				// Recuperation de la cabRequest pour acceder au point a atteindre
				myCabRequest = myCabsQueue[0]["cabRequest"];
				// Lancement de dijkstra pour retourner le tableau contenant les predecesseurs depuis le noeud actuel vers le noeud de la cabRequest
				if(dijkstraLoop(myCabRequest["location"]["area"], myCabRequest["location"]["location"]) == 1) {
					// Recuperation du chemin a parcourir a l'aide du tableau des predecesseurs
					findPath(myCabsInfo, myCabRequest["location"]["area"], myCabRequest["location"]["location"]);
					// Affichage du chemin
					console.log(path.reverse());
					console.log();
					// Parcours des points du chemin
					for (var i = 0 ; i < path.length ; i++) {
						// Envoie du deplacement aux clients
						sendCabInformations(path, i, myCabsInfo, myCabRequest);
						// Attente de 2sec
						sleep(2000);
					}
				}else {
					console.log("There is no way to reach "
						 + "{" + myCabRequest["location"]["area"] + ", " + myCabRequest["location"]["location"] + "}"
						 + " from "
						 + "{" + myCabsInfo[0]["loc_now"]["area"] + ", " + myCabsInfo[0]["loc_now"]["location"] + "}");
				}
			}
			// On supprime le premier de la liste des cabQueues
			myCabsQueue.splice(0, 1);
			// On recupere le nombre de stacks pour l'arduino
			arduinoCabQueue = myCabsQueue.length;
			// On passe le cab à free
			arduinoCabAvailability = 1;
			// On envoie les nouvelles infos vers les ecrans
			sendCabInfoToScreens(JSON.parse('{"cabQueue":' + JSON.stringify(myCabsQueue) + '}'));
			// On met à jour les infos de l'arduino
			sendToArduino();
		break;
		// Deconnexion volontaire d'un client
		case 'logOut':
			wsArduino.close();
			wsArduino = null;
			console.log("Arduino connexion closed");
		break;
	}
}

// Initialisation du serveur
function initServer() {
	/** 
	 * Créer un Serveur HTTP
	 * Le serveur renvoi l'ip et le port à utiliser pour la web socket
	 */
	server = http.createServer(function (req, response) {
		if (req.url == "/Arduino") {
			ipServer = "192.168.1.8"
		} else {
			ipServer = "172.30.1.150";
		}

		// Formate l'entete de la réponse
		response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"*"} );
	  	// Formate le contenu de la réponse en json
		var jsonResponse = JSON.stringify({ 
			ipWebSocket: ipServer, 
			portWebSocket: "4000"
		});
		// Envoi la reponse json
		response.end(jsonResponse);
	});
	// Création d'une socket sur le port 9000
	wss = new WebSocketServer({port: 4000});
	console.log("Web Socket en ecoute sur le port 4000");
}

// Initialisation des variables
function initVariables() {
	listWsClient = [];
	myAvailableNeighbourhoods = JSON.parse(JSON.stringify(myNeighbourhoods));
}

// Initialisation générale
function initialisation() {
	initVariables();
	initServer();
}

// Boucle contenant les nouvelles connexions et les actions sur les messages
function loop() {// Dès qu'un membre se connecte
	wss.on('connection', function(ws) {
		// IP du client
		clientIp = new String(ws._socket.remoteAddress);
		// Test quel type de client se connecte (arduino ou écran)
		if (clientIp.valueOf() == arduinoIp.valueOf()) {
			// sauvegarde de la websocket 
			wsArduino = ws;
			console.log("arduino connected !");
			// Envoie des infos aux clients
			sendInformationsToRefreshClientsAndArduino();
			
		// Si c'est un ecran
		} else if (myAvailableNeighbourhoods.length > 0) {
			listWsClient.push(ws);
			wsClient = ws;
			console.log("screen connected !");
			// On renvoi le JSON du quartier pour l'écran concerné
			sendCabInfoToScreen(myAvailableNeighbourhoods[0]);
			//On supprime le quartier car il n'est plus disponible
			myAvailableNeighbourhoods.splice(0, 1);
			sendCabInfoToScreens(myCabsInfo[0]);
		} else {
			wsClient = null;
			console.log("Un nouveau client de type ecran a essaye de se connecter");
		}
		
		// Dès qu'on reçoit un message
		ws.on('message', function(message) {
			// Traitement de l'action en fonction du message
			actionOnMessageReceived(message);
		});

		ws.on('open', function() {
			console.log("connected");
		});
	});
}

// Ajoute un listener sur la console pour des envoies de message test en dur 
stdin.addListener("data", function(d) {
	switch (d.toString().trim()) {
		case "quit":
			if (wsArduino != null) {
				wsArduino.close();
				wsArduino = null;
			}
			server.close();
			process.exit();
		break;

		case "reset":
			server.close();
			initVariables();
		break;
		default:
			/*if (wsArduino != null) {
				wsArduino.send(d.toString().trim());
			}*/
			if (listWsClient[0] != null) {
				listWsClient[0].send(d.toString().trim());
			}
		break;
	}
});

// Initialisation du serveur
initialisation();

// Fonction principale du serveur qui traite les connexions et les arrivées de messages
loop();