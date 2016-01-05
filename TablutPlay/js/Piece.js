.import "../js/Score.js" as ScoreScript
.import "../js/TablutClient.js" as TablutClientScript
.import QtQuick 2.5 as ComponentScript

var BLACK_COLOR = "#000000";
var RED_COLOR = "#ff0000";
var KING_COLOR = "#fff000";
var BLACK_TEAM = "black";
var RED_TEAM = "red";

function createPion(container, color) {
    var component = Qt.createComponent("../qml/Piece.qml");
    if (component.status == ComponentScript.Component.Ready){
        return component.createObject(container, {"color": color});
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
        if (index + j * grid.rows < board.model && iBottom == 1 && (index + j * grid.rows) % grid.columns == index % grid.columns) {
            gridCaseBottom = board.itemAt(index + j * grid.rows);
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

        if (index - j >= 0 && iLeft == 1 && Math.floor((index - j) / grid.rows) == Math.floor(index / grid.rows) && iLeft == 1) {
            gridCaseLeft = board.itemAt(index - j);
            if (gridCaseLeft.pion == null) {
                gridCaseLeft.border.color = KING_COLOR;
                gridCaseLeft.border.width = 2;
            } else {
                iLeft = 0;
            }
        } else {
            iLeft = 0;
        }

        if (index + j < board.model && iRight == 1 && Math.floor((index + j) / grid.rows) == Math.floor(index / grid.rows) && iRight == 1) {
            gridCaseRight = board.itemAt(index + j);
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
    for (var i = 0; i < board.model; i++) {
        board.itemAt(i).border.color = BLACK_COLOR;
        board.itemAt(i).border.width = 1;
    }
}

function movePiece(color) {

    //First click : Selection of the piece to move
    if (!grid.clicked && pion.color == color ) {
        grid.clicked = true;
        grid.savePiece = pion;
        grid.saveIndex = index;
        boardcase.border.color = KING_COLOR;
        boardcase.border.width = 2;
        highlightedCase();

    //Second click : Selection of the destination
    } else if (grid.clicked && checkMoveRules(grid.saveIndex, index) && grid.saveIndex != index) {
        pion = createPion(boardcase, grid.savePiece.color);
        pion.team = grid.savePiece.team;
        grid.clicked = false;
        ScoreScript.updateScore();
        TablutClientScript.sendMoveToServer("on going", "movement", grid.player, grid.saveIndex, index);
        grid.savePiece.destroy();
        grid.savePiece = null;
        grid.saveIndex = -1;
        unhighlightedCase();
        checkCapture();
        checkWin();
        if (grid.player == BLACK_TEAM) grid.player = RED_TEAM;
        else grid.player = BLACK_TEAM;
    }
}

function movePlayerPiece() {
    if (pion != null && !grid.clicked && pion.team == grid.player) movePiece(pion.color);
    else if (pion == null && grid.clicked) movePiece(grid.savePiece.color);
    else if (grid.clicked && grid.saveIndex == index) {
        unhighlightedCase();
        grid.clicked = false;
        grid.saveIndex = -1;
    }
}

function checkMoveRules(indexFrom, indexTo) {
    var xIndexFrom = indexFrom % grid.rows;
    var yIndexFrom = Math.floor(indexFrom / grid.rows);
    var xIndexTo = indexTo % grid.rows;
    var yIndexTo = Math.floor(indexTo / grid.rows);

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
            caseIndexToTest = i * grid.rows + xIndexFrom; //Calcul of the case's index
            //If there is  a piece here
            if(board.itemAt(caseIndexToTest).pion != null) return false;
        }
        return true;
    } else if (deltaX != 0 && deltaY == 0) { //Horizontal movement
        step = deltaX / Math.abs(deltaX); //Step of the loop
        i = xIndexFrom; //Loop's index

        // While no collision detection or not arrived
        while (i != xIndexTo) {
            i += step;
            caseIndexToTest = i + grid.rows * yIndexFrom; //Calcul of the case's index
            //If there is  a piece here
            if(board.itemAt(caseIndexToTest).pion != null) return false;
        }
        return true;
    } else return true; //No movement
}

function checkCaptureDirection(near, nearPlus2) {
    if (board.itemAt(near).pion !== null && board.itemAt(nearPlus2).pion !== null) {
        if(board.itemAt(near).pion.team != board.itemAt(index).pion.team && board.itemAt(nearPlus2).pion.team == board.itemAt(index).pion.team) {
            if (board.itemAt(near).pion.color != KING_COLOR
                    && board.itemAt(index).pion.color != KING_COLOR
                    && board.itemAt(nearPlus2).pion.color != KING_COLOR) {
                board.itemAt(near).pion.destroy();
                board.itemAt(near).pion = null;
            }
        }
    }
}

function checkCapture() {
    var topIndex = index - grid.rows;
    var bottomIndex = index + grid.rows;
    var leftIndex = index - 1;
    var rightIndex = index + 1;

    var topIndexPlus2 = index - 2 * grid.rows;
    var bottomIndexPlus2 = index + 2 * grid.rows;
    var leftIndexPlus2 = index - 2;
    var rightIndexPlus2 = index + 2;

    if (topIndex >= 0 && topIndexPlus2 >= 0) {
        checkCaptureDirection(topIndex, topIndexPlus2);
    }
    if (bottomIndex < board.model && bottomIndexPlus2 < board.model) {
        checkCaptureDirection(bottomIndex, bottomIndexPlus2);
    }
    if (leftIndex >= 0 && leftIndexPlus2 >= 0 && Math.floor(index / grid.rows) == Math.floor(leftIndex / grid.rows) && Math.floor(index / grid.rows) == Math.floor(leftIndexPlus2 / grid.rows)) {
        checkCaptureDirection(leftIndex, leftIndexPlus2);
    }
    if (rightIndex < board.model && rightIndexPlus2 < board.model && Math.floor(index / grid.rows) == Math.floor(rightIndex / grid.rows) && Math.floor(index / grid.rows) == Math.floor(rightIndexPlus2 / grid.rows)) {
        checkCaptureDirection(rightIndex, rightIndexPlus2);
    }
}

function checkRedWin() {
    if (pion.color == KING_COLOR) {
        var line = Math.floor(index / grid.rows);
        var column = index % grid.columns;
        if (line == 0 || line == grid.rows - 1 || column == 0 || column == grid.columns - 1)
            return true
        else return false;
    } else return false;
}

function checkBlackWin() {
    //Tour de jeu du joueur noir
    var i = 0;
    var cpt = 0;

    //Récupérer l'index du king
    while (i < board.model) {
        if (board.itemAt(i).pion != null) {
            if (board.itemAt(i).pion.color == KING_COLOR) break;
        }
        i++;
    }

    // Vérification case nord
    if (i - grid.rows >= 0 && board.itemAt(i - grid.columns).pion != null && board.itemAt(i - grid.columns).pion.color == BLACK_COLOR) {
        cpt++;
    } else if (i - grid.columns < 0){
        cpt++;
    }

    // Vérification case sud
    if (i + grid.columns <= board.model - 1 && board.itemAt(i + grid.columns).pion != null && board.itemAt(i + grid.columns).pion.color == BLACK_COLOR) {
        cpt++;
    } else if (i + grid.columns > board.model - 1) {
        cpt++;
    }

    // Vérification case ouest
    if (i - 1 >= 0 && Math.floor((i - 1) / grid.columns) == Math.floor(i / grid.columns) && board.itemAt(i - 1).pion != null && board.itemAt(i - 1).pion.color == BLACK_COLOR) {
        cpt++;
    } else if (i - 1 >= 0 && Math.floor((i - 1) / grid.columns) != Math.floor(i / grid.columns)) {
        cpt++;
    }

    // Vérification case est
    if (i + 1 < board.model && Math.floor((i + 1) / grid.columns) == Math.floor(i / grid.columns) && board.itemAt(i + 1).pion != null && board.itemAt(i + 1).pion.color == BLACK_COLOR) {
        cpt++;
    } else if (i + 1 < board.model && Math.floor((i + 1) / grid.columns) != Math.floor(i / grid.columns)) {
        cpt++;
    }

    if (cpt == 4) { return true;
    } else return false;
}

function checkWin() {
    if (grid.player == BLACK_TEAM && checkBlackWin()) {
        console.log("Black won");
        return true;
    } else if (grid.player == RED_TEAM && checkRedWin()) {
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
        board.itemAt(pions[i][1] * grid.rows + pions[i][0]).pion = createPion(board.itemAt(pions[i][1] * grid.rows + pions[i][0]), BLACK_COLOR);
        board.itemAt(pions[i][1] * grid.rows + pions[i][0]).pion.team = BLACK_TEAM;
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
        board.itemAt(pions[i][1] * grid.rows + pions[i][0]).pion = createPion(board.itemAt(pions[i][1] * grid.rows + pions[i][0]), RED_COLOR);
        board.itemAt(pions[i][1] * grid.rows + pions[i][0]).pion.team = RED_TEAM;
    }
}

function initKingPion() {
    board.itemAt(40).pion = createPion(board.itemAt(40), KING_COLOR);
    board.itemAt(40).pion.team = RED_TEAM;
}
