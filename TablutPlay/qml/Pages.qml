import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import QtQuick.Layouts 1.1

Item {

    property alias playPage: playPage
    property alias pausePage: pausePage
    property alias connectionPage: connectionPage
    property alias menuPage: menuPage
    property alias optionPage: optionPage
    property alias endPage: endPage

    PlayPage {
        id: playPage
        visible: false
        anchors.fill: parent
    }

    PausePage {
        id: pausePage
        visible: false
        anchors.fill: parent
    }

    ConnectionPage {
        id: connectionPage
        visible: false
        anchors.fill: parent
    }

    MenuPage {
        id: menuPage
        visible: false
        anchors.fill: parent
    }

    OptionPage {
        id: optionPage
        visible: false
        anchors.fill: parent
    }

    NewConfigPage {
        id: newConfigPage
        visible: false
        anchors.fill: parent
    }

    EndPage {
        id: endPage
        visible: false
        anchors.fill: parent
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

            PropertyChanges {
                target: optionPage
                visible: false
            }

            PropertyChanges {
                target: newConfigPage
                visible: false
            }

            PropertyChanges {
                target: endPage
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

            PropertyChanges {
                target: optionPage
                visible: false
            }

            PropertyChanges {
                target: newConfigPage
                visible: false
            }

            PropertyChanges {
                target: endPage
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

            PropertyChanges {
                target: optionPage
                visible: false
            }

            PropertyChanges {
                target: newConfigPage
                visible: false
            }

            PropertyChanges {
                target: endPage
                visible: false
            }
        },

        State {
            name: "Option"

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
                visible: false
            }

            PropertyChanges {
                target: optionPage
                visible: true
            }

            PropertyChanges {
                target: newConfigPage
                visible: false
            }

            PropertyChanges {
                target: endPage
                visible: false
            }
        },

        State {
            name: "New Config"

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
                visible: false
            }

            PropertyChanges {
                target: menuPage
                visible: false
            }

            PropertyChanges {
                target: optionPage
                visible: true
                opacity: 0.1
                enabled: false
            }

            PropertyChanges {
                target: newConfigPage
                visible: true
            }

            PropertyChanges {
                target: endPage
                visible: false
            }
        },

        State {
            name: "End"

            PropertyChanges {
                target: playPage
                visible: true
                opacity: 0.1
                enabled: false
            }

            PropertyChanges {
                target: connectionPage
                visible: false
            }

            PropertyChanges {
                target: pausePage
                visible: false
            }

            PropertyChanges {
                target: menuPage
                visible: false
            }

            PropertyChanges {
                target: optionPage
                visible: false
            }

            PropertyChanges {
                target: newConfigPage
                visible: false
            }

            PropertyChanges {
                target: endPage
                visible: true
            }
        }
    ]

    /*transitions: [

        Transition {
            from: "Option"
            to: "New Config"

            SequentialAnimation {
                PropertyAnimation {
                    target: optionPage
                    property: "opacity"
                    to: 0.2
                    duration: 2000
                }
                PropertyAnimation {
                    target: newConfigPage
                    property: "opacity"
                    to: 1.0
                    duration: 2000
                }
            }
        }
    ]*/
}
