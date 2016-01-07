import QtQuick 2.5
import QtQuick.Controls 1.4

import "../js/Timer.js" as TimerScript
import "../js/Option.js" as OptionScript
import "../js/Jeu.js" as JeuScript

ApplicationWindow {
    id: applicationWindow
    title: qsTr("Plus qu'un jeu, un tablut")
    width: minimumWidth
    height: minimumHeight
    minimumWidth: 560
    minimumHeight: 630
    color: OptionScript.BACKGROUND_COLOR
    visible: true

    menuBar: MenuBar {
        Menu {
            id: barMenu
            title: qsTr("File")
            MenuItem {
                text: qsTr("&Open")
                onTriggered: messageDialog.show(qsTr("Open action triggered"));
            }
            MenuItem {
                text: qsTr("&Quit")
                onTriggered: Qt.quit();
            }
        }
    }

    Pages {
        id: mainForm
        state: "Menu"
        anchors.fill: parent
    }
}
