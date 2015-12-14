import QtQuick 2.5
import QtQuick.Controls 1.4

import "Timer.js" as TimerScript

ApplicationWindow {
    id: applicationWindow
    title: qsTr("Plus qu'un jeu, un tablut")
    width: minimumWidth
    height: minimumHeight
    minimumWidth: 560
    minimumHeight: 630

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

    MainForm {
        id: mainForm
        state: "Connection"
        anchors.centerIn: parent
    }
}
