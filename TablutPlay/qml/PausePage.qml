import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4

import "../js/Jeu.js" as JeuScript

Item {

    ColumnLayout {
        id: pauseStateLayout
        spacing: 5
        anchors.centerIn: parent

        property int masterSize: 36
        property int commonSize: 18

        Label {
            id: pauseLabel
            text: qsTr("Pause")
            font.family: "Courier"
            verticalAlignment: Text.AlignVCenter
            horizontalAlignment: Text.AlignHCenter
            font.pointSize: parent.masterSize
            Layout.alignment: Qt.AlignCenter
        }

        Label {
            id: resumeLabel
            text: qsTr("Resume")
            font.family: "Courier"
            color: "#888888"
            font.pointSize: parent.commonSize
            font.italic: true
            verticalAlignment: Text.AlignVCenter
            horizontalAlignment: Text.AlignHCenter
            Layout.alignment: Qt.AlignCenter

            MouseArea {
                id: resumeMouseArea
                anchors.fill: parent
                hoverEnabled: true
                onEntered: parent.color = "#891ca8";
                onExited: parent.color = "#888888";
                onClicked: JeuScript.sendOrderToServer("resume");
            }
        }

        Label {
            id: quitLabel
            text: qsTr("Quit")
            font.family: "Courier"
            color: "#888888"
            font.pointSize: parent.commonSize
            font.italic: true
            verticalAlignment: Text.AlignVCenter
            horizontalAlignment: Text.AlignHCenter
            Layout.alignment: Qt.AlignCenter

            MouseArea {
                id: quitMouseArea
                anchors.fill: parent
                hoverEnabled: true
                onEntered: parent.color = "#891ca8";
                onExited: parent.color = "#888888";
                onClicked: {
                    mainForm.state = "Game";
                    JeuScript.getHttpRequestServer(JeuScript.serverAddr, JeuScript.listGridPath, JeuScript.httpPort);
                }
            }
        }
    }
}

