.import "Score.js" as ScoreScript
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
var wait = true;

function createPion(container, color, team) {
    var component = Qt.createComponent("../qml/Piece.qml");
    if (component.status == ComponentScript.Component.Ready){
        return component.createObject(container, {"color": color, "width": 0.9 * mainForm.playPage.field.width / mainForm.playPage.field.columns, "height": 0.9 * mainForm.playPage.field.height / mainForm.playPage.field.rows, "team": team});
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
    } else if (grid.clicked && checkMoveRules(mainForm.playPage.field.saveIndex, index) && mainForm.playPage.field.saveIndex != index) {
        mainForm.playPage.field.clicked = false;
        sendMoveToServer("on going", "movement", mainForm.playPage.field.playerTeam, mainForm.playPage.field.saveIndex, index);
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
                sendCaptureToServer("on going", "capture", mainForm.playPage.field.playerTeam, near);
            }
        }
    }
}

function checkCapture() {
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

function sendMoveToServer (status, type, tour, depart, arrivee) {
    var json = {
                "partie":
                {
                    "status": status,
                    "type": type,
                    "tour": tour,
                    "action":
                    {
                        "depart" : depart,
                        "arrivee": arrivee
                    },
                    "statistique":
                    {
                        "score": parseInt(mainForm.playPage.score.scoreLabel.text) + 1,
                        "temps": mainForm.playPage.timerLabel.timeLabel.text
                    }
                }
               };

    mainForm.playPage.wsClient.sendTextMessage(JSON.stringify(json));
}

function sendCaptureToServer(status, type, tour, index) {
    var json = {
                "partie":
                {
                    "status": status,
                    "type": type,
                    "tour": tour,
                    "action":
                    {
                        "index" : index
                    },
                    "statistique":
                    {
                        "score": mainForm.playPage.score.scoreLabel.text,
                        "temps": mainForm.playPage.timerLabel.timeLabel.text
                    }
                }
               };

    mainForm.playPage.wsClient.sendTextMessage(JSON.stringify(json));
}

function sendWinToServer(team) {
    var json = {
                "partie":
                {
                    "status": "end",
                    "type": "win",
                    "tour": team,
                    "action": "" + team + " team won the game !",
                    "statistique":
                    {
                        "score": mainForm.playPage.score.scoreLabel.text,
                        "temps": mainForm.playPage.timerLabel.timeLabel.text
                    }
                }
               };

    mainForm.playPage.wsClient.sendTextMessage(JSON.stringify(json));
}

function messageReceived(message) {
    var messageParse = JSON.parse(message);

    switch(Object.keys(messageParse)[0]) {

        case "partie":
            switch (messageParse["partie"]["type"]) {
                case "movement":
                    // Create the new pion
                    mainForm.playPage.field.savePiece = mainForm.playPage.field.board.itemAt(parseInt(messageParse["partie"]["action"]["depart"])).pion;
                    mainForm.playPage.field.board.itemAt(parseInt(messageParse["partie"]["action"]["arrivee"])).pion = createPion(mainForm.playPage.field.board.itemAt(parseInt(messageParse["partie"]["action"]["arrivee"])), mainForm.playPage.field.savePiece.color, mainForm.playPage.field.savePiece.team);
                    mainForm.playPage.field.savePiece = null;

                    // Destroy the old one
                    mainForm.playPage.field.board.itemAt(parseInt(messageParse["partie"]["action"]["depart"])).pion.destroy();

                    // Update Score
                    mainForm.playPage.score.scoreLabel.text = messageParse["partie"]["statistique"]["score"];

                    // Update saveIndex
                    mainForm.playPage.field.saveIndex = parseInt(messageParse["partie"]["action"]["arrivee"]);

                    checkCapture();
                    checkWin();

                    // Change player turn
                    if (messageParse["partie"]["tour"] == BLACK_TEAM) mainForm.playPage.field.player = RED_TEAM;
                    else mainForm.playPage.field.player = BLACK_TEAM;

                    break;
                case "capture":
                    mainForm.playPage.field.board.itemAt(parseInt(messageParse["partie"]["action"]["index"])).pion.destroy();
                    mainForm.playPage.field.board.itemAt(parseInt(messageParse["partie"]["action"]["index"])).pion = null;
                    break;
                default:
                    break;
            }
            break;

        case "init":
            mainForm.playPage.field.playerTeam = messageParse["init"]["equipe"];
            mainForm.playPage.field.player = messageParse["init"]["tour"];
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
