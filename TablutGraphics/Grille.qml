import QtQuick 2.0
import QtQuick.Dialogs 1.2

import "Piece.js" as PieceScript

Grid {
    id: grid
    width: parent.width
    height: parent.height
    rows: 9
    columns: rows

    property Piece savePiece: null
    property Case saveCase: null
    property int saveIndex: -1
    property bool clicked: false
    property string player: PieceScript.BLACK_TEAM

    Repeater {
        id: board
        model: parent.rows * parent.columns
        delegate: Case {}
    }

    MessageDialog {
        id: messageDialog
        text: "Done !"
    }

    //Component.onCompleted: test();
    Component.onCompleted: PieceScript.initPions();
}

