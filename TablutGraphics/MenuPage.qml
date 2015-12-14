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
                label: Text {
                    text: qsTr("Online")
                    font.family: "britannic bold"
                    font.pointSize: 22
                    style: Text.Outline
                    styleColor: "#744000"
                    color: "white"
                    horizontalAlignment: Text.AlignHCenter
                    verticalAlignment: Text.AlignVCenter
                }
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
                label: Text {
                    text: qsTr("Offline")
                    font.family: "britannic bold"
                    font.pointSize: 22
                    style: Text.Outline
                    styleColor: "#744000"
                    color: "white"
                    horizontalAlignment: Text.AlignHCenter
                    verticalAlignment: Text.AlignVCenter
                }
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
                label: Text {
                    text: qsTr("Options")
                    font.family: "britannic bold"
                    style: Text.Outline
                    styleColor: "#744000"
                    font.pointSize: 22
                    color: "white"
                    horizontalAlignment: Text.AlignHCenter
                    verticalAlignment: Text.AlignVCenter
                }
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
