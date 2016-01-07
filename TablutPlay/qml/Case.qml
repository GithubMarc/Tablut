import QtQuick 2.4

import "../js/Jeu.js" as JeuScript

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
            JeuScript.movePlayerPiece();
        }
    }

    property Piece pion: null
}

