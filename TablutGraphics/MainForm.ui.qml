import QtQuick 2.4
import QtQuick.Controls 1.3
import QtQuick.Layouts 1.1

Item {
    id: firstItem
    width: 560
    height: 560
    anchors.horizontalCenter: parent.horizontalCenter

    property alias mouseArea: mouseArea
    property alias timerLabel: timerLabel

    ColumnLayout {
        id: columnLayout1
        x: 0
        y: 0
        width: firstItem.width
        height: firstItem.height
        spacing: 0

        RowLayout {
            id: rowLayout1
            height: 42
            anchors.right: field.right
            anchors.rightMargin: 0
            anchors.left: field.left
            anchors.leftMargin: 0
            anchors.bottom: field.top
            anchors.bottomMargin: 0
            spacing: 0

            TimerLabel {
                id: timerLabel
                width: 150
                height: 42
                anchors.horizontalCenter: parent.horizontalCenter
            }

            Score {
                id: score
                width: 75
                height: 42
                anchors.right: parent.right
                anchors.rightMargin: 0
            }
        }

        Grille {
            id: field
            width: 518
            height: 518
            anchors.horizontalCenter: parent.horizontalCenter
        }
    }

    Label {
        id: label1
        x: 0
        y: 0
        text: qsTr("Label")
        visible: false
        opacity: 0

        MouseArea {
            id: mouseArea
            anchors.fill: parent
        }
    }

    states: [
        State {
            name: "State1"

            PropertyChanges {
                target: columnLayout1
                visible: false
            }

            PropertyChanges {
                target: label1
                x: 234
                y: 261
                width: 92
                height: 39
                text: qsTr("Pause")
                visible: true
                font.family: "Courier"
                verticalAlignment: Text.AlignVCenter
                horizontalAlignment: Text.AlignHCenter
                font.pointSize: 24
                opacity: 1
            }
        }
    ]
}
