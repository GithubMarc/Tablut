import QtQuick 2.0
import "Piece.js" as PieceScript

Rectangle {
    id: boardcase
    width: 50
    height: 50
    color: "#ffffff"
    enabled: true
    border.width: 1
    clip: false

    MouseArea {
        anchors.fill: parent
        onClicked: PieceScript.movePlayerPiece();
        //onClicked: test();
    }

    property Piece pion: null

    function test() {
        console.log(index);
    }
}

