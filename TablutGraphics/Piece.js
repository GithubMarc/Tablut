function createPion(container, color) {
    var component = Qt.createComponent("Piece.qml");
    if (component.status == Component.Ready){
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
        if (index + j * grid.rows < 81 && iBottom == 1 && (index + j * grid.rows) % grid.columns == index % grid.columns) {
            gridCaseBottom = board.itemAt(index + j * grid.rows);
            if (gridCaseBottom.pion == null) {
                gridCaseBottom.border.color = "#fff000";
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
                gridCaseTop.border.color = "#fff000";
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
                gridCaseLeft.border.color = "#fff000";
                gridCaseLeft.border.width = 2;
            } else {
                iLeft = 0;
            }
        } else {
            iLeft = 0;
        }

        if (index + j < 81 && iRight == 1 && Math.floor((index + j) / grid.rows) == Math.floor(index / grid.rows) && iRight == 1) {
            gridCaseRight = board.itemAt(index + j);
            if (gridCaseRight.pion == null) {
                gridCaseRight.border.color = "#fff000";
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
    for (var i = 0; i < 81; i++) {
        board.itemAt(i).border.color = "#000000";
        board.itemAt(i).border.width = 1;
    }
}

function movePiece(color) {

    //First click : Selection of the piece to move
    if (pion != null && !grid.clicked && pion.color == color ) {
        grid.clicked = true;
        grid.savePiece = pion;
        grid.saveIndex = index;
        boardcase.border.color = "#fff000";
        boardcase.border.width = 2;
        pion = null;
        highlightedCase();

    //Second click : Selection of the destination
    } else if (pion == null && grid.clicked && checkMoveRules(grid.saveIndex, index)) {
        pion = createPion(boardcase, grid.savePiece.color);
        grid.clicked = false;
        grid.savePiece.destroy();
        grid.savePiece = null;
        unhighlightedCase();
        checkCapture();
        checkWin()
    }
}

function movePlayerPiece() {
    if (grid.player == 1) {
        console.log("red");
        movePiece("#ff0000");
        grid.player = 2;
    } else if (grid.player == 2) {
        console.log("black");
        movePiece("#000000");
        grid.player = 1;
    } else {
        if (pion.color == "#000000") {
            console.log("black");
            grid.player = 1
        } else {
            console.log("red");
            grid.player = 2;
        }
        movePiece(pion.color);
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
    if (deltaX != 0 && deltaY != 0) { return false;

    //Collision
    } else if (deltaX == 0 && deltaY != 0) { //Vertical movement
        step = deltaY / Math.abs(deltaY); //Step of the loop
        i = yIndexFrom; //Loop's index

        // While no collision detection or not arrived
        while (i != yIndexTo) {
            i += step;
            caseIndexToTest = i * grid.rows + xIndexFrom; //Calcul of the case's index
            //If there is  a piece here
            if(board.itemAt(caseIndexToTest).pion != null) {
                return false;
            }
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
            if(board.itemAt(caseIndexToTest).pion != null) {
                return false;
            }
        }
        return true;
    } else { return true; } //No movement
}

function checkCaptureDirection(near, nearPlus2) {
    if (board.itemAt(near).pion !== null && board.itemAt(nearPlus2).pion !== null) {
        if(board.itemAt(near).pion.color != board.itemAt(index).pion.color && board.itemAt(nearPlus2).pion.color == board.itemAt(index).pion.color) {
            if (board.itemAt(near).pion.color != "#fff000") {
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
    if (bottomIndex < 81 && bottomIndexPlus2 < 81) {
        checkCaptureDirection(bottomIndex, bottomIndexPlus2);
    }
    if (leftIndex >= 0 && leftIndexPlus2 >= 0 && Math.floor(index / grid.rows) == Math.floor(leftIndex / grid.rows) && Math.floor(index / grid.rows) == Math.floor(leftIndexPlus2 / grid.rows)) {
        checkCaptureDirection(leftIndex, leftIndexPlus2);
    }
    if (rightIndex < 81 && rightIndexPlus2 < 81 && Math.floor(index / grid.rows) == Math.floor(rightIndex / grid.rows) && Math.floor(index / grid.rows) == Math.floor(rightIndexPlus2 / grid.rows)) {
        checkCaptureDirection(rightIndex, rightIndexPlus2);
    }
}

function checkRedWin() {
    if (pion.color == "#fff000" && (index == 0 || index == 8 || index == 72 || index == 80)) {
        return true
    } else { return false; }
}

function checkBlackWin() {
    //Tour de jeu du joueur noir
    var i = 0;
    var cpt = 0;
    var stop = false;

    //Récupérer l'index du king
    while (!stop && i < 81) {
        if (board.itemAt(i).pion != null) {
            if (board.itemAt(i).pion.color == "#fff000") {
                stop = true;
            } else { i++; }
        } else { i++; }
    }

    if (i - grid.columns >= 0 && board.itemAt(i - grid.columns).pion != null && board.itemAt(i - grid.columns).pion.color == "#000000") {
        cpt++;
    } else if (i - grid.columns < 0){
        cpt++;
    }

    if (i + grid.columns <= 80 && board.itemAt(i + grid.columns).pion != null && board.itemAt(i + grid.columns).pion.color == "#000000") {
        cpt++;
    } else if (i + grid.columns > 80) {
        cpt++;
    }

    if (i - 1 >= 0 && Math.floor((i - 1) / grid.columns) == Math.floor(i / grid.columns) && board.itemAt(i - 1).pion != null && board.itemAt(i - 1).pion.color == "#000000") {
        cpt++;
    } else if (i - 1 >= 0 && Math.floor((i - 1) / grid.columns) != Math.floor(i / grid.columns)) {
        cpt++;
    }

    if (i + 1 < 81 && Math.floor((i + 1) / grid.columns) == Math.floor(i / grid.columns) && board.itemAt(i + 1).pion != null && board.itemAt(i + 1).pion.color == "#000000") {
        cpt++;
    } else if (i + 1 < 81 && Math.floor((i + 1) / grid.columns) != Math.floor(i / grid.columns)) {
        cpt++;
    }

    if (cpt == 4) { return true;
    } else { return false; }
}

function checkWin() {
    if (checkBlackWin()) {
        console.log("Black won");
        return true;
    } else if (checkRedWin()) {
        console.log("Red won");
        return true;
    } else {return false;}
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
        board.itemAt(pions[i][1] * grid.rows + pions[i][0]).pion = createPion(board.itemAt(pions[i][1] * grid.rows + pions[i][0]), "#000000");
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
        board.itemAt(pions[i][1] * grid.rows + pions[i][0]).pion = createPion(board.itemAt(pions[i][1] * grid.rows + pions[i][0]), "#ff0000");
    }
}

function initKingPion() {
    board.itemAt(40).pion = createPion(board.itemAt(40), "#fff000");
}
