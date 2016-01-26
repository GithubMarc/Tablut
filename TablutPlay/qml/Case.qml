import QtQuick 2.4

import "../js/Jeu.js" as JeuScript

Rectangle {
    id: boardcase
    color: "#ffffff"
    border.width: 1

    MouseArea {
        anchors.fill: parent
        onClicked: {
            JeuScript.movePlayerPiece();
        }
    }

    property Piece pion: null
}

