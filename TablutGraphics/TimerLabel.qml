import QtQuick 2.4
import QtQuick.Controls 1.3

import "Timer.js" as TimerScript

Rectangle {
    id: timeContainer
    border.color: "red"
    border.width: 2
    color: "transparent"
    width: 300
    height :42

    property alias timer: timer

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
            if(timer.running == true) TimerScript.stopTimer();
            else TimerScript.startTimer();
        }
    }
}