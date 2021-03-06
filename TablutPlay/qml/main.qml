import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Dialogs 1.2

import "../js/Timer.js" as TimerScript
import "../js/Jeu.js" as JeuScript

ApplicationWindow {
    property bool userConnected: false
    property string userEmail: ""
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
        state: "Menu"
        anchors.fill: parent
    }

    MessageDialog {
        id: messageDialog
        visible: false
    }
}
