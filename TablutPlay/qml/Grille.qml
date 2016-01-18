import QtQuick 2.0
import QtQuick.Dialogs 1.2

import "../js/Jeu.js" as JeuScript

Grid {
    id: grid
    width: parent.width
    height: parent.height
    rows: 9
    columns: rows

    property alias board: board

    property Piece savePiece: null
    property Case saveCase: null
    property int saveIndex: -1
    property bool clicked: false
    property string player: ""
    property string playerTeam: ""
    property int scoring: 0
    property int idPartie: 0
    property bool firstLaunch: true

    Repeater {
        id: board
        model: parent.rows * parent.columns
        delegate: Case {}
    }

    MessageDialog {
        id: messageDialog
        text: "Done !"
    }
}

