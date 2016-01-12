import QtQuick 2.4
import QtQuick.Controls 1.3

import "../js/Timer.js" as TimerScript
import "../js/Jeu.js" as JeuScript

Rectangle {
    id: timeContainer
    border.color: "red"
    border.width: 2
    color: "transparent"

    property alias timer: timer
    property alias timeLabel: timeLabel

    Label {
        id: timeLabel
        text: qsTr("00:00:00")
        anchors.horizontalCenter: parent.horizontalCenter
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter
        style: Text.Normal
        font.family: "Times New Roman"
        font.pointSize: 24
    }

    Timer {
        id: timer
        interval: 1000
        running: false
        repeat: true
        onTriggered: TimerScript.updateTime()
    }

    MouseArea {
        anchors.fill: parent
        onClicked: {
            if(timer.running == true) {
                JeuScript.sendOrderToServer("pause");
            }
        }
    }
}
