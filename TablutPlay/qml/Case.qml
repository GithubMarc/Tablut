import QtQuick 2.4

import "../js/Piece.js" as PieceScript
import "../js/Timer.js" as TimerScript

Rectangle {
    id: boardcase
    width: grid.width / grid.columns
    height: grid.height / grid.rows
    color: "#ffffff"
    enabled: true
    border.width: 1
    clip: false

    MouseArea {
        anchors.fill: parent
        onClicked: {
            PieceScript.movePlayerPiece();
            TimerScript.startTimer();
        }
    }

    property Piece pion: null

    function test() {
        console.log(index);
    }
}

