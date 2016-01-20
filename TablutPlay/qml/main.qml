import QtQuick 2.5
import QtQuick.Controls 1.4

import "../js/Timer.js" as TimerScript
import "../js/Jeu.js" as JeuScript

ApplicationWindow {
    property string backgroundColor: FileIO.getColor("BACKGROUND_COLOR");

    id: applicationWindow
    title: qsTr("Plus qu'un jeu, un tablut")
    width: minimumWidth
    height: minimumHeight
    minimumWidth: 560
    minimumHeight: 630
    color: applicationWindow.backgroundColor
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
        state: "Option"
        anchors.fill: parent
    }
}
