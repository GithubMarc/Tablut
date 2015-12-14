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
        visible: false
        anchors.centerIn: parent
    }

    ConnectionPage {
        id: connectionPage
        visible: false
        anchors.centerIn: parent
    }

    MenuPage {
        id: menuPage
        visible: false
        anchors.centerIn: parent
    }

    states: [

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

            PropertyChanges {
                target: menuPage
                visible: false
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

            PropertyChanges {
                target: menuPage
                visible: false
            }
        },
        State {
            name: "Menu"

            PropertyChanges {
                target: pausePage
                visible: false
            }

            PropertyChanges {
                target: connectionPage
                visible: false
            }

            PropertyChanges {
                target: playPage
                visible: false
            }

            PropertyChanges {
                target: menuPage
                visible: true
            }
        }
    ]
}
