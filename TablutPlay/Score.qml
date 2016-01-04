import QtQuick 2.5
import QtQuick.Controls 1.4

import "Score.js" as ScoreScript

Rectangle {
    id: scoreContainer
    border.color: "green"
    border.width: 2
    color: "transparent"

    property alias score: scoreLabel

    Label {
        id:scoreLabel
        text: "0"
        anchors.horizontalCenter: parent.horizontalCenter
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter
        font.family: "Helvetica"
        font.pointSize: 24
    }

}