import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4

import "Connection.js" as ConnectionScript

Item {
    ColumnLayout {
        id: connectionStateLayout
        spacing: 20
        anchors.centerIn: parent

        MenuButton {
            id: onlineButton
            caption: qsTr("Online")
            anchors.horizontalCenter: parent.horizontalCenter
            onClicked: {
                mainForm.connectionPage.repaint();
                mainForm.state = "Connection";
            }
        }

        MenuButton {
            id: offlineButton
            caption: qsTr("Offline")
            anchors.horizontalCenter: parent.horizontalCenter
            onClicked: mainForm.state = "base state";
        }

        MenuButton {
            id: optionButton
            caption: qsTr("Option")
            anchors.horizontalCenter: parent.horizontalCenter

            onClicked: {
                mainForm.state = "Option";
            }
        }
    }

    function repaint() {
        onlineButton.repaint();
        offlineButton.repaint();
        optionButton.repaint();
    }
}
