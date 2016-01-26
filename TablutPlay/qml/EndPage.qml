import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.1
import QtQuick.Dialogs 1.2

import "../js/Jeu.js" as JeuScript

Rectangle {
    color: "#d0000000"

    property string endStateLabel: "Victoire"
    property string endSentenceLabel: "Le roi est sauf"

    ColumnLayout {
        id: labelContainer
        anchors.centerIn: parent
        spacing: 30

        Label {
            id: endState
            text: endStateLabel
            font.pointSize: 36
            color: "#ffffff"
            Layout.alignment: Qt.AlignCenter
        }

        Label {
            id: endSentence
            text: endSentenceLabel
            font.pointSize: 24
            color: "#ffffff"
            Layout.alignment: Qt.AlignCenter
        }
    }

    Item {
        width: 300
        height: 35
        anchors.top: labelContainer.bottom
        anchors.topMargin: labelContainer.spacing
        anchors.horizontalCenter: parent.horizontalCenter

        Button {
            id: newGameSameTeam
            text: qsTr("New Game")
            implicitHeight: 35
            anchors.left: parent.left
            anchors.leftMargin: 0

            onClicked: JeuScript.sendEndGameOption("new game");
        }

        Button {
            id: newGameSwitchTeam
            text: qsTr("Switch Team")
            implicitHeight: 35
            anchors.horizontalCenter: parent.horizontalCenter

            onClicked: JeuScript.sendEndGameOption("switch team");
        }

        Button {
            id: menu
            text: qsTr("Menu")
            implicitHeight: 35
            anchors.right: parent.right
            anchors.rightMargin: 0

            onClicked: JeuScript.sendEndGameOption("menu");
        }
    }
}

