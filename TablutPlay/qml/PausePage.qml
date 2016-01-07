import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4

import "../js/Timer.js" as TimerScript
import "../js/Jeu.js" as JeuScript

ColumnLayout {
    id: pauseStateLayout
    spacing: 5

    property int masterSize: 36
    property int commonSize: 18

    Label {
        id: pauseLabel
        text: qsTr("Pause")
        font.family: "Courier"
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter
        font.pointSize: masterSize
        anchors.horizontalCenter: parent.horizontalCenter
    }

    Label {
        id: resumeLabel
        text: qsTr("Resume")
        font.family: "Courier"
        color: "#888888"
        font.pointSize: commonSize
        font.italic: true
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter
        anchors.horizontalCenter: parent.horizontalCenter

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
        font.pointSize: commonSize
        font.italic: true
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter
        anchors.horizontalCenter: parent.horizontalCenter

        MouseArea {
            id: quitMouseArea
            anchors.fill: parent
            hoverEnabled: true
            onEntered: parent.color = "#891ca8";
            onExited: parent.color = "#888888";
            onClicked: TimerScript.resumePart();
        }
    }
}

