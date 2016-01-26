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
    property alias gameSelectionPage: gameSelectionPage
    property alias newGamePage: newGamePage
    property alias newAccountPage: newAccountPage

    NewAccountPage {
        id: newAccountPage
        visible: false
        anchors.fill: parent
    }

    NewGamePage {
        id: newGamePage
        visible: false
        anchors.fill: parent
    }

    GameSelectionPage {
        id: gameSelectionPage
        visible: false
        anchors.fill: parent
    }

    PlayPage {
        id: playPage
        visible: true
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
                target: newAccountPage
                visible: false
            }

            PropertyChanges {
                target: newGamePage
                visible: false
            }

            PropertyChanges {
              target: gameSelectionPage
              visible: false
            }

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
                target: newAccountPage
                visible: false
            }

            PropertyChanges {
                target: newGamePage
                visible: false
            }

            PropertyChanges {
              target: gameSelectionPage
              visible: false
            }

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
                target: newAccountPage
                visible: false
            }

            PropertyChanges {
                target: newGamePage
                visible: false
            }

            PropertyChanges {
              target: gameSelectionPage
              visible: false
            }

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
                target: newAccountPage
                visible: false
            }

            PropertyChanges {
                target: newGamePage
                visible: false
            }

            PropertyChanges {
              target: gameSelectionPage
              visible: false
            }

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
                target: newAccountPage
                visible: false
            }

            PropertyChanges {
                target: newGamePage
                visible: false
            }

            PropertyChanges {
              target: gameSelectionPage
              visible: false
            }

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
                target: newAccountPage
                visible: false
            }

            PropertyChanges {
                target: newGamePage
                visible: false
            }

            PropertyChanges {
              target: gameSelectionPage
              visible: false
            }

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
        },

        State {
            name: "Game"

            PropertyChanges {
                target: newAccountPage
                visible: false
            }

            PropertyChanges {
                target: newGamePage
                visible: false
            }

            PropertyChanges {
              target: gameSelectionPage
              visible: true
            }

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
            name: "New Game"

            PropertyChanges {
                target: newAccountPage
                visible: false
            }

            PropertyChanges {
                target: newGamePage
                visible: true
            }

            PropertyChanges {
              target: gameSelectionPage
              visible: true
              opacity: 0.02
              enabled: false
            }

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
            name: "New Account"

            PropertyChanges {
                target: newAccountPage
                visible: true
            }

            PropertyChanges {
                target: newGamePage
                visible: false
            }

            PropertyChanges {
              target: gameSelectionPage
              visible: false
            }

            PropertyChanges {
                target: playPage
                visible: false
            }

            PropertyChanges {
                target: connectionPage
                visible: true
                opacity: 0.02
                enabled: false
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
                visible: false
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
