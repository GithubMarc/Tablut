import QtQuick 2.4
import QtQuick.Controls 1.3
import QtQuick.Layouts 1.1

Item {
    id: firstItem
    width: 650
    height: 650
    anchors.horizontalCenter: parent.horizontalCenter
    anchors.verticalCenter: parent.verticalCenter

    property alias mouseArea: mouseArea
    property alias timerLabel: timerLabel

    ColumnLayout {
        id: baseStateLayout
        visible: true
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: parent.top
        anchors.topMargin: 20
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
        id: pauseStateLayout
        anchors.centerIn: parent
        spacing: 5
        visible: false

        Label {
            id: pauseLabel
            text: qsTr("Pause")
            visible: false
            anchors.horizontalCenter: parent.horizontalCenter
        }

        Label {
            id: resumeLabel
            text: qsTr("Resume")
            visible: false
            anchors.horizontalCenter: parent.horizontalCenter

            MouseArea {
                id: mouseArea
                anchors.fill: parent
                hoverEnabled: true
            }
        }
    }

    ColumnLayout {
        id: connectionStateLayout
        visible: false
        spacing: 20
        anchors.centerIn: parent

        TextField {
            id: loginTextField
            width: 300
            placeholderText: qsTr("Login")
            visible: false
            anchors.horizontalCenter: parent.horizontalCenter
        }

        TextField {
            id: passwordTextField
            width: loginTextField.width
            placeholderText: qsTr("Password")
            visible: false
            anchors.horizontalCenter: parent.horizontalCenter
        }

        Rectangle {
            id: connectionButton
            width: 300
            height: 40
            radius: 10
            color: "darkblue"
            anchors.horizontalCenter: parent.horizontalCenter

            Label {
               text: qsTr("Connection")
               anchors.centerIn: parent
               font.pointSize: 18
               font.family: "Helvetica"
               color: "white"
            }

            MouseArea {
                anchors.fill: parent
            }

            visible: false
        }
    }

    states: [
        State {
            name: "Pause"

            PropertyChanges {
                target: baseStateLayout
                visible: false
            }

            PropertyChanges {
                target: connectionStateLayout
                visible: false
            }

            PropertyChanges {
                target: pauseStateLayout
                visible: true
            }

            PropertyChanges {
                target: pauseLabel
                text: qsTr("Pause")
                visible: true
                font.family: "Courier"
                verticalAlignment: Text.AlignVCenter
                horizontalAlignment: Text.AlignHCenter
                font.pointSize: 24
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
            }
        },

        State {
            name: "Connection"

            PropertyChanges {
                target: baseStateLayout
                visible: false
            }

            PropertyChanges {
                target: pauseStateLayout
                visible: false
            }

            PropertyChanges {
                target: connectionStateLayout
                visible: true
            }

            PropertyChanges {
                target: loginTextField
                visible: true
            }

            PropertyChanges {
                target: passwordTextField
                visible: true
            }

            PropertyChanges {
                target: connectionButton
                visible: true
            }
        }
    ]
}
