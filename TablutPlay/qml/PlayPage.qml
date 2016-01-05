import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtWebSockets 1.0

import "../js/Connection.js" as ConnectionScript
import "../js/TablutClient.js" as TablutClientScript


ColumnLayout {
    id: baseStateLayout
    spacing: 5

    property alias field: field
    property alias timerLabel: timerLabel
    property alias score: score
    property alias wsClient: wsClient

    RowLayout {
        id: firstLine
        anchors.right: field.right
        anchors.rightMargin: 0
        anchors.left: field.left
        anchors.leftMargin: 0

        TimerLabel {
            id: timerLabel
            width: 150
            height: 42
            anchors.horizontalCenter: parent.horizontalCenter
        }

        Score {
            id: score
            width: 75
            height: timerLabel.height
            anchors.right: parent.right
            anchors.rightMargin: 0
        }
    }

    Grille {
        id: field
        width: 550
        height: 550
        anchors.horizontalCenter: parent.horizontalCenter
    }

    WebSocket {

        id: wsClient
        onStatusChanged: {
            console.log("" + status);
        }
        onTextMessageReceived: {
            mainForm.connectionPage.alertConnection.title = qsTr("Message received");
            mainForm.connectionPage.alertConnection.text = qsTr(message)
            mainForm.connectionPage.alertConnection.visible = true;
        }
        active: false
    }
}

