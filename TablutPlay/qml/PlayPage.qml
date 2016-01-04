import QtQuick 2.5
import QtQuick.Layouts 1.1

ColumnLayout {
    id: baseStateLayout
    spacing: 5

    property alias timerLabel: timerLabel

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
}

