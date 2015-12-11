import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import QtQuick.Layouts 1.1

Item {

    PlayPage {
        id: playPage
        anchors.centerIn: parent
    }

    PausePage {
        id: pausePage
        anchors.centerIn: parent
    }

    ConnectionPage {
        id: connectionPage
        anchors.centerIn: parent
    }

    states: [
        State {
            name: "base state"

            PropertyChanges {
                target: playPage
                visible: true
            }

            PropertyChanges {
                target: connectionPage
                visible: false
            }

            PropertyChanges {
                target: pausePage
                visible: false
            }
        },

        State {
            name: "Pause"

            PropertyChanges {
                target: playPage
                visible: false
            }

            PropertyChanges {
                target: connectionPage
                visible: false
            }

            PropertyChanges {
                target: pausePage
                visible: true
            }
        },

        State {
            name: "Connection"

            PropertyChanges {
                target: playPage
                visible: false
            }

            PropertyChanges {
                target: pausePage
                visible: false
            }

            PropertyChanges {
                target: connectionPage
                visible: true
            }
        }
    ]
}
