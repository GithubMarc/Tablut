/**
 * Variables
 */
ws = null; // Web Socket

var json="";

var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

var HEIGHT_CANVAS=canvas.height;
var WIDTH_CANVAS=canvas.width;

var monJson="";
var monNomDeMap="";
var maMap="";
var maTailleDeMap = "";
	
var maTailleDeMap_Width = "";
var maTailleDeMap_Height = "";
var mesNoeuds ="";
var mesRues = "";
var mesPonts = "";
var bridges_points =[];
var mesNoeudsOneWay = [];
var first_point_x=0;
var first_point_y=0;
var second_point_x=0;
var second_point_y=0;
var previous_start={"x":0,"y":0};

var enContinueSelect = false;

// Récupère/Fixe les dimenssions
canvas.width= window.screen.width;
canvas.height= window.screen.height;
WIDTH_CANVAS= window.innerWidth;
HEIGHT_CANVAS= window.innerHeight;
	
// Affiche le spinner
document.getElementById('spinnerload').style.display='block';

/** 
 * Appel la fonction pour recupèrer l'ip et le port de connexion au server pour la websocket
 * Si on récupère les informations on connecte la web socket
 * Url Raspberry : 172.30.0.155
 * Url PC Fred   : 172.30.0.174
 * Url PC Marc   : 172.30.1.150
 */
//GETConnexionServer("172.30.1.150", 8080);

/**
 * Fonction qui envoi une requete HTTP
 * Récupère au format JSON l'adresse ip et le port de connexion pour la Web Socket
 * Url pour la requete HTTP
 * Port pour la requete HTTP
 */
 function GETConnexionServer(url, port){
 	var ipWebSocket = "";
 	var portWebSocket = "";

 	// Envoi une requete http Get à l'adresse du serveur avec pour parametre le type (client)
	$.ajax({
    	type: 'GET',
    	url: "http://"+url+":"+port,
    	success: function(response) { 
    		// Récupère l'adresse ip et le port de connexion pour la web socket
    		ipWebSocket = response.ipWebSocket;
    		portWebSocket = response.portWebSocket;
    		console.log("Ip WebSocket:" + ipWebSocket + ", Port WebSocket:" + portWebSocket);
			// Appel la fonction pour se connecter via la web socket
			return Connect(ipWebSocket, portWebSocket);
    	},
    	error: function(response){ console.log("Erreur reponse serveur"); return false; }
    });
 }

 /**
  * Création d'une websocket et tentative de connexion à une url
  */
function Connect(ipServer, portServer)
{	
	// Verifie que l'ip et le port du serveur est renseigné si non on sort de la fonction
	if (ipServer == "" || portServer == "")	return;

	// Formate l'uri de connexion pour la websocket
	var uri = "ws://"+ipServer+":"+portServer;

	// Si l'objet ws n'est pas vide, c'est qu'il y a une connexion existante
	if(null !== ws)
	{
		Log("Vous etes deja connecte.", "websocketerror");
		return;
	}
	
	try
	{
		// On s'assure que le module Websocket est disponible sur le navigateur
		if(!window.WebSocket)
			throw "Impossible d'utiliser WebSocket. Votre navigateur ne l'implemente pas.";

		Log("Tentative de connexion a " + uri);
		
		ws = new WebSocket(uri);

		if(undefined === ws)
			throw "Impossible de creer un point de sortie.";

		Log(ReadyState(ws.readyState), "websocketstatus");
		
		// Fonction exécutée lorsque la socket est ouverte
		ws.onopen = function()
		{
			Log(ReadyState(ws.readyState), "websocketstatus");
			// Envoi le message qui indique qu'on veut l'avancement en continue
			Send('{"enContinue":'+enContinueSelect+'}');
		};

		// Fonction exécutée lorsque la socket est fermée
		ws.onclose = function(e)
		{
			Log(ReadyState(ws.readyState), "websocketstatus");
			if(e.wasClean)
			{
				Log("Connexion proprement terminee.", "websocketstatus");
			}
			else
			{
				Log(e.reason, "websocketerror");
				Log("Connexion terminee.", "websocketstatus");
				// Efface les stacks
				$('.stack').remove(); 
				// Recharge la page
				location.reload();
			}

			// Réinitialisation de l'objet websocket
			ws = null;

			// Init IHM
			document.getElementById('spinnerload').style.display='block';
			document.getElementById('canvas').style.display='none';
			document.getElementById('cab').style.display='none';
		};

		// Fonction qui est exécutée lorsqu'une erreur se produit
		ws.onerror = function(e)
		{
			console.log(e);
			Log("Une erreur est survenue.", "websocketerror");
		};

		// Fonction exécutée lorsqu'un message est reçu dans la socket
		ws.onmessage = function(e)
		{
			if(e.data!="")
			{
				json=e.data;
				receiveDatas();
				
				Log("Recu> " + e.data, "websocketmsg");

				// Reception correcte
				return true;
			}else
			{
				Log("Une erreur est survenue.", "websocketerror");
			}
		};
	}
	catch(str)
	{	
		Log(str, "websocketerror"); // Affichage de l'erreur critique
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
		Log("Vous n'etes pas connecte.", "websocketerror");
		return;
	}
	ws.close();
	Log(ReadyState(ws.readyState), "websocketstatus");
}

/**
 * Envoi le message à la socket vers le serveur
 */
function Send(text)
{
	if(null === ws)
	{
		Log("Vous n'etes pas connecte.", "websocketerror");
		return;
	}
	// Envoi du message texte
	ws.send(text);
	Log("Envoye> " + text, "websocketmsg");
}

/**
 * Fonction qui récupère les données via la websocket
 */
function receiveDatas()
{
	// Cache le spinner
	document.getElementById('spinnerload').style.display='none';

	// Parse la chaine au format json
	monJson=JSON.parse(json);

	// Information de dessin de la map
	if('map' in monJson){
		monNomDeMap=monJson["name"];
		document.getElementById('mapname').innerHTML = monNomDeMap;
		maMap=monJson["map"];
		maTailleDeMap = maMap.weight;
		maTailleDeMap_Width = maTailleDeMap.w;
		maTailleDeMap_Height = maTailleDeMap.h;
		mesNoeuds = maMap.vertices;
		mesRues = maMap.streets;
		mesPonts = maMap.bridges;
		
		// On crée un tableau contenant le nom des points sur lesquels il y a un point. Ainsi on peut utiliser la fonction indexOf pour déterminer si un point contient un pont ou non. C'est moins couteux que de faire un boucle à chaque fois.
		bridges_points=[];
		for(var i=0; i<mesPonts.length;i++)
		{
			bridges_points.push(mesPonts[i]["from"]);	
		}

		// Vide le tableau
		mesNoeudsOneWay=[];
		// On créer un tableau contenant les vertex d'un sens unique sauf le premier
		for (var j = 0; j < mesRues.length; j++) {
			// La propriété path contient chaque points de la street. Exemple : 0 : "m" et 1: "b"
			var paths = mesRues[j]["path"];
			
			// Si la rue est a sens unique
			if(mesRues[j]["oneway"]){
				// Recupere les noms des vertex de la rue qui est a sens unique (sauf le premier)
				for (var k =1; k < paths.length; k++) {
					mesNoeudsOneWay.push(paths[k]);			
				}
			}
		} 

		// Appel la fonction d'initialisation
		initialize();	
	} 
	// Information du Cab
	else if('odometer' in monJson){
		// Récupère l'objet loc_now
		locVertex=monJson["loc_now"];
		// Nom du quartier identique au mien
		if(locVertex["area"] == monNomDeMap){
			var enContinue = false;
			// Verifie si le serveur envoi les données point par point ou en continu
			if('x' in locVertex) enContinue = true;
			// Appel la fonction qui dessine le cab en passant le name du vertex en paramètre, le x et le y
			drawCab(locVertex["location"],locVertex["x"],locVertex["y"], enContinue);
		} else {
			document.getElementById('cab').style.display='none'; // On cache le taxi
			resizeCanvas(); //On redessine la map
		}
	} 
	// Liste des demandes dans la file d'attente
	else if ('cabQueue' in monJson){
		// Récupère le tableau de cabRequest
		monCabQueue=monJson["cabQueue"];
		// Efface les stacks
		$('.stack').remove(); 
		// Parcours la liste de cabRequest afin de dessiner dans l'ordre les demandes
		for(i=0; i<monCabQueue.length; i++){
			// Appel la fonction qui va dessiner sur le vertex le numéro de la pile (a, 2) vertex 'a' second dans la file d'attente
			drawQueue(monCabQueue[i]["cabRequest"]["location"]["location"], i);
		}
	}
}

/**
 * Fonction qui retourne l'indice de l'élément du tableau
 */
function findIndexObject(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

/**
 * Fonction qui retourne l'indice du vertex si le cab se trouve dessus
 */
 function findCabOnBridges(vertex_name_cab){
 		// Initialise l'indice à -1
 		var indice_vertex = -1;

		// Variables temporaire
		var vertex_from = "";
		var vertex_to   = "";

		// Parcours les ponts du quartier
		for(var i=0; i<mesPonts.length;i++)
		{
			// Récupère les vertex du pont
			var vertex_from = mesPonts[i]["from"]; // Vertex d'origine 
			var vertex_to   = mesPonts[i].to.vertex; // Vertex d'arrivé
			
			// Récupère l'index du noeuds qui correspond à la position du cab sur le pont 
			if(vertex_name_cab == vertex_from) indice_vertex=findIndexObject(mesNoeuds, 'name', vertex_to);
			else if(vertex_name_cab == vertex_to) indice_vertex=findIndexObject(mesNoeuds, 'name', vertex_from);
		}

		// Renvoi l'indice
		return indice_vertex;
 }

/**
 * Fonction qui récupère les coordonées du clic sur l'écran et les traites
 */
function clickCanvas(event) {
	// On recupère le handler pour l'évènement
	event = event || window.event; 

    // Coordonnés x et y du clic
    x = (event.pageX - canvas.offsetLeft)/WIDTH_CANVAS,
    y = (event.pageY - canvas.offsetTop)/HEIGHT_CANVAS;
		
	// On efface les rectangles précédents
    context.clearRect(0,0,WIDTH_CANVAS, HEIGHT_CANVAS);
	//On redessine la map
	resizeCanvas();
	// On dessine le point le plus proche
	var vertex_name=drawNearPoint(x*WIDTH_CANVAS,y*HEIGHT_CANVAS);
	
	// Formate la chaine a envoyer par la websocket
	var positionCab='{"cabRequest":{"location":{"area":"'+monNomDeMap+'","locationType":"vertex","location":"'+vertex_name+'"}}}';
	// Log le message
	console.log(typeof positionCab);

	// Appel la fonction pour enoyer le message
	Send(positionCab);		
}

/**
 * Fonction d'initialisation
 */
function initialize() {
	// A chaque fois que la fenêtre sera redimensionnée, la fonction resizeCanvas sera appelée
	window.addEventListener('resize', resizeCanvas, false);
	// On ajoute l'évènement clic
	window.addEventListener('click', clickCanvas, false);
	// Dessine le contour du canvas, dans un premier temps
	resizeCanvas();
	// Dessine la map
	drawMap();
}
				
/**
 * Affiche le canvas en tenant compte du redimensionnement de la fenêtre					
 */
function redraw() {
	// Appel la fonction pour re dessiner la map
	drawMap();
}
		
/**
 * Fonctionne à chaque fois la fenêtre est redimensionnée .
 * Met à jour les dimensions du canvas pour correspondre à la taille de la fenêtre
 */
function resizeCanvas() {
	canvas.width= window.innerWidth;
	canvas.height= window.innerHeight;
	
	WIDTH_CANVAS= window.innerWidth;
	HEIGHT_CANVAS= window.innerHeight;
	
	redraw();
}

/**
 * Fonction qui renvoi les état en fonction de la valeur passée en paramètre
 */
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

/**
 * Fonction qui affiche des messages de logs
 */
function Log(str, class_attr)
{
	console.log(str);
}

/**
 * Fonction attente (maison)
 */
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
