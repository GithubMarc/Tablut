.import "Score.js" as ScoreScript
.import "Timer.js" as TimerScript
.import "GameSelection.js" as GameSelectionScript
.import QtQuick 2.5 as ComponentScript

var BLACK_COLOR = "#000000";
var RED_COLOR = "#ff0000";
var KING_COLOR = "#fff000";
var BLACK_TEAM = "black";
var RED_TEAM = "red";

var ws = null;

var serverAddr = "172.30.1.1"
var httpPort = "8000"
var serverPath = "/tablutWebService/connexion"
var socketServerPath = "/tablutWebService/getWebSocketAddr"
var listGridPath = "/tablutWebService/allMatch"

function createPion(container, color, team) {
    var component = Qt.createComponent("../qml/Piece.qml");
    if (component.status == ComponentScript.Component.Ready){
        var width = 0.9 * container.width;
        return component.createObject(container, {"color": color, "width": width, "height": width, "team": team});
    }
}

//A regrouper pour tout mettre dans 1 seul if, possible ?
function highlightedCase() {
    var iTop = 1;
    var iLeft = 1;
    var iRight = 1;
    var iBottom = 1;
    var j = 1;
    var gridCaseTop = null;
    var gridCaseLeft = null;
    var gridCaseRight = null;
    var gridCaseBottom = null;

    while (iTop + iLeft + iRight + iBottom > 0) {
        if (index + j * mainForm.playPage.field.rows < mainForm.playPage.field.board.model && iBottom == 1 && (index + j * mainForm.playPage.field.rows) % mainForm.playPage.field.columns == index % mainForm.playPage.field.columns) {
            gridCaseBottom = mainForm.playPage.field.board.itemAt(index + j * mainForm.playPage.field.rows);
            if (gridCaseBottom.pion == null) {
                gridCaseBottom.border.color = KING_COLOR;
                gridCaseBottom.border.width = 2;
            } else {
                iBottom = 0;
            }
        } else {
            iBottom = 0;
        }

        if (index - j * grid.rows >= 0  && iTop == 1 && (index - j * grid.rows) % grid.columns == index % grid.columns && iTop == 1) {
            gridCaseTop = board.itemAt(index - j * grid.rows);
            if (gridCaseTop.pion == null) {
                gridCaseTop.border.color = KING_COLOR;
                gridCaseTop.border.width = 2;
            } else {
                iTop = 0;
            }
        } else {
            iTop = 0;
        }

        if (index - j >= 0 && iLeft == 1 && Math.floor((index - j) / mainForm.playPage.field.rows) == Math.floor(index / mainForm.playPage.field.rows) && iLeft == 1) {
            gridCaseLeft = mainForm.playPage.field.board.itemAt(index - j);
            if (gridCaseLeft.pion == null) {
                gridCaseLeft.border.color = KING_COLOR;
                gridCaseLeft.border.width = 2;
            } else {
                iLeft = 0;
            }
        } else {
            iLeft = 0;
        }

        if (index + j < mainForm.playPage.field.board.model && iRight == 1 && Math.floor((index + j) / mainForm.playPage.field.rows) == Math.floor(index / mainForm.playPage.field.rows) && iRight == 1) {
            gridCaseRight = mainForm.playPage.field.board.itemAt(index + j);
            if (gridCaseRight.pion == null) {
                gridCaseRight.border.color = KING_COLOR;
                gridCaseRight.border.width = 2;
            } else {
                iRight = 0;
            }
        } else {
            iRight = 0;
        }
        j++;
    }
}

function unhighlightedCase() {
    for (var i = 0; i < mainForm.playPage.field.board.model; i++) {
        mainForm.playPage.field.board.itemAt(i).border.color = BLACK_COLOR;
        mainForm.playPage.field.board.itemAt(i).border.width = 1;
    }
}

function movePiece(color) {

    //First click : Selection of the piece to move
    if (!mainForm.playPage.field.clicked && pion.color == color ) {
        mainForm.playPage.field.clicked = true;
        mainForm.playPage.field.savePiece = pion;
        mainForm.playPage.field.saveIndex = index;
        boardcase.border.color = KING_COLOR;
        boardcase.border.width = 2;
        highlightedCase();

    //Second click : Selection of the destination
    } else if (mainForm.playPage.field.clicked && checkMoveRules(mainForm.playPage.field.saveIndex, index) && mainForm.playPage.field.saveIndex != index) {
        mainForm.playPage.field.clicked = false;
        sendMoveToServer(mainForm.playPage.field.saveIndex, index);
        if(mainForm.playPage.field.firstLaunch) sendOrderToServer("start");
        unhighlightedCase();
    }
}

function movePlayerPiece() {
    if (pion != null && !mainForm.playPage.field.clicked && pion.team == mainForm.playPage.field.playerTeam && mainForm.playPage.field.playerTeam == mainForm.playPage.field.player) movePiece(pion.color);
    else if (pion == null && mainForm.playPage.field.clicked) movePiece(mainForm.playPage.field.savePiece.color);
    else if (mainForm.playPage.field.clicked && mainForm.playPage.field.saveIndex == index) {
        unhighlightedCase();
        mainForm.playPage.field.clicked = false;
        mainForm.playPage.field.saveIndex = -1;
    }
}

function checkMoveRules(indexFrom, indexTo) {
    var xIndexFrom = indexFrom % mainForm.playPage.field.rows;
    var yIndexFrom = Math.floor(indexFrom / mainForm.playPage.field.rows);
    var xIndexTo = indexTo % mainForm.playPage.field.rows;
    var yIndexTo = Math.floor(indexTo / mainForm.playPage.field.rows);

    var deltaX = xIndexTo - xIndexFrom; //Vertical movement
    var deltaY = yIndexTo - yIndexFrom; //Horizontal movement

    var step;
    var i;
    var caseIndexToTest;

    //Straight line
    if (deltaX != 0 && deltaY != 0) return false;

    //Collision
    else if (deltaX == 0 && deltaY != 0) { //Vertical movement
        step = deltaY / Math.abs(deltaY); //Step of the loop
        i = yIndexFrom; //Loop's index

        // While no collision detection or not arrived
        while (i != yIndexTo) {
            i += step;
            caseIndexToTest = i * mainForm.playPage.field.rows + xIndexFrom; //Calcul of the case's index
            //If there is  a piece here
            if(mainForm.playPage.field.board.itemAt(caseIndexToTest).pion != null) return false;
        }
        return true;
    } else if (deltaX != 0 && deltaY == 0) { //Horizontal movement
        step = deltaX / Math.abs(deltaX); //Step of the loop
        i = xIndexFrom; //Loop's index

        // While no collision detection or not arrived
        while (i != xIndexTo) {
            i += step;
            caseIndexToTest = i + mainForm.playPage.field.rows * yIndexFrom; //Calcul of the case's index
            //If there is  a piece here
            if(mainForm.playPage.field.board.itemAt(caseIndexToTest).pion != null) return false;
        }
        return true;
    } else return true; //No movement
}

function checkCaptureDirection(near, nearPlus2) {
    if (mainForm.playPage.field.board.itemAt(near).pion !== null && mainForm.playPage.field.board.itemAt(nearPlus2).pion !== null) {
        if(mainForm.playPage.field.board.itemAt(near).pion.team != mainForm.playPage.field.board.itemAt(mainForm.playPage.field.saveIndex).pion.team && mainForm.playPage.field.board.itemAt(nearPlus2).pion.team == mainForm.playPage.field.board.itemAt(mainForm.playPage.field.saveIndex).pion.team) {
            if (mainForm.playPage.field.board.itemAt(near).pion.color != KING_COLOR
            && mainForm.playPage.field.board.itemAt(mainForm.playPage.field.saveIndex).pion.color != KING_COLOR
            && mainForm.playPage.field.board.itemAt(nearPlus2).pion.color != KING_COLOR) {
                sendCaptureToServer(near);
            }
        }
    }
}

function checkCapture(team) {
    if(team == mainForm.playPage.field.playerTeam) {
        var index = mainForm.playPage.field.saveIndex;

        var topIndex = index - mainForm.playPage.field.rows;
        var bottomIndex = index + mainForm.playPage.field.rows;
        var leftIndex = index - 1;
        var rightIndex = index + 1;

        var topIndexPlus2 = index - 2 * mainForm.playPage.field.rows;
        var bottomIndexPlus2 = index + 2 * mainForm.playPage.field.rows;
        var leftIndexPlus2 = index - 2;
        var rightIndexPlus2 = index + 2;

        if (topIndex >= 0 && topIndexPlus2 >= 0) {
            checkCaptureDirection(topIndex, topIndexPlus2);
        }
        if (bottomIndex < mainForm.playPage.field.board.model && bottomIndexPlus2 < mainForm.playPage.field.board.model) {
            checkCaptureDirection(bottomIndex, bottomIndexPlus2);
        }
        if (leftIndex >= 0 && leftIndexPlus2 >= 0 && Math.floor(index / mainForm.playPage.field.rows) == Math.floor(leftIndex / mainForm.playPage.field.rows) && Math.floor(index / mainForm.playPage.field.rows) == Math.floor(leftIndexPlus2 / mainForm.playPage.field.rows)) {
            checkCaptureDirection(leftIndex, leftIndexPlus2);
        }
        if (rightIndex < mainForm.playPage.field.board.model && rightIndexPlus2 < mainForm.playPage.field.board.model && Math.floor(index / mainForm.playPage.field.rows) == Math.floor(rightIndex / mainForm.playPage.field.rows) && Math.floor(index / mainForm.playPage.field.rows) == Math.floor(rightIndexPlus2 / mainForm.playPage.field.rows)) {
            checkCaptureDirection(rightIndex, rightIndexPlus2);
        }
    }
}

function checkRedWin() {
    if (mainForm.playPage.field.board.itemAt(mainForm.playPage.field.saveIndex).pion.color == KING_COLOR) {
        var line = Math.floor(mainForm.playPage.field.saveIndex / mainForm.playPage.field.rows);
        var column = mainForm.playPage.field.saveIndex % mainForm.playPage.field.columns;
        if (line == 0 || line == mainForm.playPage.field.rows - 1 || column == 0 || column == mainForm.playPage.field.columns - 1)
            return true
        else return false;
    } else return false;
}

function checkBlackWin() {
    //Tour de jeu du joueur noir
    var i = 0;
    var cpt = 0;

    //Récupérer l'index du king
    while (i < mainForm.playPage.field.board.model) {
        if (mainForm.playPage.field.board.itemAt(i).pion != null) {
            if (mainForm.playPage.field.board.itemAt(i).pion.color == KING_COLOR) break;
        }
        i++;
    }

    // Vérification case nord
    if (i - mainForm.playPage.field.rows >= 0 && mainForm.playPage.field.board.itemAt(i - mainForm.playPage.field.columns).pion != null && mainForm.playPage.field.board.itemAt(i - mainForm.playPage.field.columns).pion.color == BLACK_COLOR) {
        cpt++;
    } else if (i - mainForm.playPage.field.columns < 0){
        cpt++;
    }

    // Vérification case sud
    if (i + mainForm.playPage.field.columns <= mainForm.playPage.field.board.model - 1 && mainForm.playPage.field.board.itemAt(i + mainForm.playPage.field.columns).pion != null && mainForm.playPage.field.board.itemAt(i + mainForm.playPage.field.columns).pion.color == BLACK_COLOR) {
        cpt++;
    } else if (i + mainForm.playPage.field.columns > mainForm.playPage.field.board.model - 1) {
        cpt++;
    }

    // Vérification case ouest
    if (i - 1 >= 0 && Math.floor((i - 1) / mainForm.playPage.field.columns) == Math.floor(i / mainForm.playPage.field.columns) && mainForm.playPage.field.board.itemAt(i - 1).pion != null && mainForm.playPage.field.board.itemAt(i - 1).pion.color == BLACK_COLOR) {
        cpt++;
    } else if (i - 1 >= 0 && Math.floor((i - 1) / mainForm.playPage.field.columns) != Math.floor(i / mainForm.playPage.field.columns)) {
        cpt++;
    }

    // Vérification case est
    if (i + 1 < mainForm.playPage.field.board.model && Math.floor((i + 1) / mainForm.playPage.field.columns) == Math.floor(i / mainForm.playPage.field.columns) && mainForm.playPage.field.board.itemAt(i + 1).pion != null && mainForm.playPage.field.board.itemAt(i + 1).pion.color == BLACK_COLOR) {
        cpt++;
    } else if (i + 1 < mainForm.playPage.field.board.model && Math.floor((i + 1) / mainForm.playPage.field.columns) != Math.floor(i / mainForm.playPage.field.columns)) {
        cpt++;
    }

    if (cpt == 4) { return true;
    } else return false;
}

function checkWin() {
    if (mainForm.playPage.field.playerTeam == BLACK_TEAM && checkBlackWin()) {
        sendWinToServer(BLACK_TEAM);
        console.log("Black won");
        return true;
    } else if (mainForm.playPage.field.playerTeam == RED_TEAM && checkRedWin()) {
        sendWinToServer(RED_TEAM);
        console.log("Red won");
        return true;
    } else return false;
}

function initPions() {
    initBlackPions();
    initRedPions();
    initKingPion();
}

function initBlackPions() {
    var pions = [                 [3, 0], [4, 0], [5, 0],
                                          [4, 1],
                  [0, 3],                                         [8, 3],
                  [0, 4], [1, 4],                         [7, 4], [8, 4],
                  [0, 5],                                         [8, 5],

                                          [4, 7],
                                  [3, 8], [4, 8], [5, 8]
                  ];
    var length = pions.length;
    for (var i=0; i<length; i++) {
        mainForm.playPage.field.board.itemAt(pions[i][1] * mainForm.playPage.field.rows + pions[i][0]).pion = createPion(mainForm.playPage.field.board.itemAt(pions[i][1] * mainForm.playPage.field.rows + pions[i][0]), BLACK_COLOR, BLACK_TEAM);
    }

}

function initRedPions() {
    var pions = [                 [4, 2],
                                  [4, 3],
                  [2, 4], [3, 4],        [5, 4], [6, 4],
                                  [4, 5],
                                  [4, 6]
                  ];
    var length = pions.length;
    for (var i=0; i<length; i++) {
        mainForm.playPage.field.board.itemAt(pions[i][1] * mainForm.playPage.field.rows + pions[i][0]).pion = createPion(mainForm.playPage.field.board.itemAt(pions[i][1] * mainForm.playPage.field.rows + pions[i][0]), RED_COLOR, RED_TEAM);
    }
}

function initKingPion() {
    mainForm.playPage.field.board.itemAt(40).pion = createPion(mainForm.playPage.field.board.itemAt(40), KING_COLOR, RED_TEAM);
}

function postHttpRequestServer(addr, path, port, sendMessage){
    var xmlHttp = new XMLHttpRequest();
    mainForm.connectionPage.connectionInformation.visible = true;
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
                mainForm.state = "Game";
                getHttpRequestServer(serverAddr, listGridPath, httpPort);
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
            case "match_list":
                GameSelectionScript.clearPage();
                for(var game in jsonParse["liste"]) {
                    mainForm.gameSelectionPage.listGameSelection.push(GameSelectionScript.createGrid(mainForm.gameSelectionPage.gridContainer));
                    mainForm.gameSelectionPage.listGameSelection[game].nom = jsonParse["liste"][game]["nom"];
                    mainForm.gameSelectionPage.listGameSelection[game].statut = jsonParse["liste"][game]["statusPartie"];
                    mainForm.gameSelectionPage.listGameSelection[game].idPartie = jsonParse["liste"][game]["idPartie"];
                    drawField(mainForm.gameSelectionPage.listGameSelection[game], jsonParse["liste"][game]["plateau"])
                }
                break;
            default:
                console.log(jsonParse["succes"] + " erreur");
        }
    }
    else
    {
        mainForm.connectionPage.alertConnection.visible = true;
        mainForm.connectionPage.alertConnection.informativeText = jsonParse["erreur"];
        console.log(jsonParse["erreur"]);
    }
}

function sendMoveToServer (depart, arrivee) {
    var json =
    {
        "mouvement":
        {
            "idPartie": mainForm.playPage.field.idPartie,
            "depart": depart,
            "arrivee": arrivee
        }
    };

    mainForm.playPage.wsClient.sendTextMessage(JSON.stringify(json));
}

function sendCaptureToServer(index) {
    var json =
    {
        "capture":
        {
            "idPartie": mainForm.playPage.field.idPartie,
            "index": index
        }
    };

    mainForm.playPage.wsClient.sendTextMessage(JSON.stringify(json));
}

function sendWinToServer(team) {
    var json =
    {
        "win":
        {
            "idPartie": mainForm.playPage.field.idPartie,
            "equipe": "" + team,
            "statutPartie": "end"
        }
    };

    mainForm.playPage.wsClient.sendTextMessage(JSON.stringify(json));
}

function sendOrderToServer(order) {
    var json = "";

    switch(order) {
    case "start":
        json=
            {
                "start":
                {
                    "idPartie": mainForm.playPage.field.idPartie,
                    "statutPartie": "on going"
                }
            };
        break;
    case "pause":
        json=
            {
                "pause":
                {
                    "idPartie": mainForm.playPage.field.idPartie,
                    "statutPartie": "pause"
                }
            };
        break;
    case "resume":
        json=
            {
                "resume":
                {
                    "idPartie": mainForm.playPage.field.idPartie,
                    "statutPartie": "on going"
                }
            };
        break;
    case "quit":
        json=
            {
                "quit":
                {
                    "idPartie": mainForm.playPage.field.idPartie,
                    "statutPartie": "end"
                }
            };
        break;

    default: break;
    }

    mainForm.playPage.wsClient.sendTextMessage(JSON.stringify(json));
}

function sendEndGameOption(option) {
    var json =
        {
            "idPartie": mainForm.playPage.field.idPartie,
            "end": option
        };

    mainForm.playPage.wsClient.sendTextMessage(JSON.stringify(json));
}

function messageReceived(message) {
    var messageParse = JSON.parse(message);
    var key = Object.keys(messageParse)[0];
    messageParse = messageParse[key];

    switch(key) {
    case "succes":
        var json = {"connexion": mainForm.playPage.wsClient.idPartie};
        mainForm.playPage.wsClient.sendTextMessage(JSON.stringify(json));
        break;
    case "init":
        mainForm.state = "base state"
        mainForm.playPage.field.idPartie = messageParse["idPartie"];
        mainForm.playPage.field.playerTeam = messageParse["equipe"];
        mainForm.playPage.field.player = messageParse["tour"];
        drawField(mainForm.playPage, messageParse["plateau"]);
        break;

    case "mouvement":
        // Create the new pion
        mainForm.playPage.field.savePiece = mainForm.playPage.field.board.itemAt(parseInt(messageParse["depart"])).pion;
        mainForm.playPage.field.board.itemAt(parseInt(messageParse["arrivee"])).pion = createPion(mainForm.playPage.field.board.itemAt(parseInt(messageParse["arrivee"])), mainForm.playPage.field.savePiece.color, mainForm.playPage.field.savePiece.team);
        mainForm.playPage.field.savePiece = null;

        // Destroy the old one
        mainForm.playPage.field.board.itemAt(parseInt(messageParse["depart"])).pion.destroy();
        mainForm.playPage.field.board.itemAt(parseInt(messageParse["depart"])).pion = null;

        // Update Score
        ScoreScript.updateScore();

        // Update mainForm.playPage.field.saveIndex
        mainForm.playPage.field.saveIndex = parseInt(messageParse["arrivee"]);

        checkCapture(mainForm.playPage.field.board.itemAt(parseInt(messageParse["arrivee"])).pion.team);
        checkWin();

        // Change player turn
        if (mainForm.playPage.field.player == BLACK_TEAM) mainForm.playPage.field.player = RED_TEAM;
        else mainForm.playPage.field.player = BLACK_TEAM;
        break;

    case "capture":
        mainForm.playPage.field.board.itemAt(parseInt(messageParse["index"])).pion.destroy();
        mainForm.playPage.field.board.itemAt(parseInt(messageParse["index"])).pion = null;
        break;

    case "win":
        TimerScript.stopTimer();
        switch(messageParse["equipe"]) {
        case "red":
            if("red" == mainForm.playPage.field.playerTeam) {
                mainForm.endPage.endStateLabel = qsTr("Victoire");
                mainForm.endPage.endSentenceLabel = qsTr("Votre roi est sauf");
            } else {
                mainForm.endPage.endStateLabel = qsTr("Défaite");
                mainForm.endPage.endSentenceLabel = qsTr("Le roi a réussi à vous échappez");
            }
            break;
        case "black":
            if("black" == mainForm.playPage.field.playerTeam) {
                mainForm.endPage.endStateLabel = qsTr("Victoire");
                mainForm.endPage.endSentenceLabel = qsTr("Vous avez réussi à capturer le roi");
            } else {
                mainForm.endPage.endStateLabel = qsTr("Défaite");
                mainForm.endPage.endSentenceLabel = qsTr("Vous avez laissé votre roi être capturé");
            }
            break;
        default:
            break;
        }

        mainForm.state = "End";
        break;

    case "end":
        if(messageParse == "menu") mainForm.state = "Menu";
        break;

    case "start":
        TimerScript.startTimer();
        mainForm.playPage.field.firstLaunch = false;
        break;

    case "pause":
        TimerScript.stopTimer();
        mainForm.state = "Pause";
        break;

    case "resume":
        TimerScript.resumePart();
        break;

    case "quit":
        TimerScript.stopTimer();
        break;

    default:
        break;
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

function drawField(container, jsonField) {
    for (var i in jsonField) {

        if(container.field.board.itemAt(i).pion != null) {
            container.field.board.itemAt(i).pion.destroy();
            container.field.board.itemAt(i).pion = null;
        }

        switch (jsonField[i]) {
        case "black": container.field.board.itemAt(i).pion = createPion(container.field.board.itemAt(i), BLACK_COLOR, BLACK_TEAM);
            break;
        case "red": container.field.board.itemAt(i).pion = createPion(container.field.board.itemAt(i), RED_COLOR, RED_TEAM);
            break;
        case "king": container.field.board.itemAt(i).pion = createPion(container.field.board.itemAt(i), KING_COLOR, RED_TEAM);
            break;
        default:
            break;
        }
    }
}
