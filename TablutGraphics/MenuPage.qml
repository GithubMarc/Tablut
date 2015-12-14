import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import QtQuick.Dialogs 1.2

import "Connection.js" as ConnectionScript

Item {
    ColumnLayout {
        id: connectionStateLayout
        spacing: 20
        anchors.centerIn: parent

        Button {
            id: onlineButton
            implicitWidth: 350
            implicitHeight: 50
            anchors.horizontalCenter: parent.horizontalCenter
            style: ButtonStyle {
                background: Rectangle {
                    color: "#c77900"
                    border.color: "#744000"
                    border.width: 2
                    radius: 10
                }
                label: ButtonLabel { text: qsTr("Online") }
            }
            onClicked: mainForm.state = "Connection"
        }

        Button {
            id: offlineButton
            implicitWidth: 350
            implicitHeight: 50
            anchors.horizontalCenter: parent.horizontalCenter
            style: ButtonStyle {
                background: Rectangle {
                    color: "#c77900"
                    border.color: "#744000"
                    border.width: 2
                    radius: 10
                }
                label: ButtonLabel { text: qsTr("Offline") }
            }
            onClicked: mainForm.state = "base state";
        }

        Button {
            id: optionButton
            implicitWidth: 350
            implicitHeight: 50
            anchors.horizontalCenter: parent.horizontalCenter
            style: ButtonStyle {
                background: Rectangle {
                    color: "#c77900"
                    border.color: "#744000"
                    border.width: 2
                    radius: 10
                }
                label: ButtonLabel { text: "Options" }
            }
            onClicked: ConnectionScript.checkConnection();
        }


    }

    MessageDialog {
        id: alertConnection
        title: "Authentication failed"
        text: "Your login or your password may be wrong. Please try again."
        icon: StandardIcon.Critical
        visible: false
    }
}
