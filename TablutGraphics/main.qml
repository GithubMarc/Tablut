import QtQuick 2.4
import QtQuick.Layouts 1.2
import QtQuick.Controls 1.3
import QtQuick.Window 2.2
import QtQuick.Dialogs 1.2

import "Timer.js" as TimerScript

ApplicationWindow {
    id: applicationWindow
    title: qsTr("Plus qu'un jeu, un tablut")
    width: 640
    height: 640
    visible: true
    minimumWidth: 560
    minimumHeight: 600

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
        state: "base state"
        id: mainForm
        mouseArea.onClicked: TimerScript.resumePart();
        mouseArea.onEntered: {
            mouseArea.parent.color = "#891ca8";
        }
        mouseArea.onExited: {
            mouseArea.parent.color = "#000000";
        }
    }
}
