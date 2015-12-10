import QtQuick 2.4
import QtQuick.Controls 1.3
import QtQuick.Layouts 1.1

Item {
    id: firstItem
    width: 650
    height: 650

    property alias mouseArea: mouseArea
    property alias timerLabel: timerLabel

    ColumnLayout {
        id: baseStateLayout
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: parent.top
        anchors.topMargin: 5
        spacing: 5

        RowLayout {
            id: firstLine
            anchors.right: field.right
            anchors.rightMargin: 0
            anchors.left: field.left
            anchors.leftMargin: 0
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

    ColumnLayout {
        id: pauseState
        anchors.centerIn: parent
        visible: false

        Label {
            id: pauseLabel
            text: qsTr("Pause")
            visible: false
            anchors.horizontalCenter: parent.horizontalCenter
            opacity: 0
        }

        Label {
            id: resumeLabel
            text: qsTr("Resume")
            visible: false
            anchors.horizontalCenter: parent.horizontalCenter
            opacity: 0

            MouseArea {
                id: mouseArea
                anchors.fill: parent
                hoverEnabled: true
            }
        }
    }

    states: [
        State {
            name: "Pause"

            PropertyChanges {
                target: columnLayout1
                visible: false
            }

            PropertyChanges {
                target: columnLayout2
                spacing: 5
                opacity: 1
            }

            PropertyChanges {
                target: pauseLabel
                text: qsTr("Pause")
                visible: true
                font.family: "Courier"
                verticalAlignment: Text.AlignVCenter
                horizontalAlignment: Text.AlignHCenter
                font.pointSize: 24
                opacity: 1
            }

            PropertyChanges {
                target: resumeLabel
                color: "#000000"
                text: qsTr("Resume")
                visible: true
                font.family: "Courier"
                verticalAlignment: Text.AlignVCenter
                horizontalAlignment: Text.AlignHCenter
                font.pointSize: 12
                font.italic: true
                opacity: 1
            }
        },
        State {
            name: "Connection"
        }
    ]
}
