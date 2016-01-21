import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.1
import QtQuick.Dialogs 1.2

Rectangle {
    color: "#d0000000"

    property string endStateLabel: "Victoire"
    property string endSentenceLabel: "Le roi est sauf"

    ColumnLayout {
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

        Item {
            Layout.fillHeight: true
            Layout.fillWidth: true

            Button {
                id: newGameSameTeam
                text: qsTr("New Game")
                implicitHeight: 35
                anchors.left: parent.left
                anchors.leftMargin: 0
            }

            Button {
                id: newGameSwitchTeam
                text: qsTr("Switch Team")
                implicitHeight: 35
                anchors.horizontalCenter: parent.horizontalCenter
            }

            Button {
                id: quit
                text: qsTr("Quit")
                implicitHeight: 35
                anchors.right: parent.right
                anchors.rightMargin: 0
            }
        }
    }
}

