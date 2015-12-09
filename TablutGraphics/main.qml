import QtQuick 2.4
import QtQuick.Layouts 1.2
import QtQuick.Controls 1.3
import QtQuick.Window 2.2
import QtQuick.Dialogs 1.2

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
        id: mainForm
    }
}
