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

        TextField {
            id: loginTextField
            placeholderText: qsTr("Login")
            text: qsTr("Login")
            font.pointSize: 18
            implicitWidth: 350
            implicitHeight: 50
            anchors.horizontalCenter: parent.horizontalCenter
            style: TextFieldStyle {
                background: Rectangle {
                    radius: 5
                    border.color: "#744000"
                    border.width: 2
                }
            }
        }

        TextField {
            id: passwordTextField
            implicitWidth: loginTextField.implicitWidth
            implicitHeight: loginTextField.implicitHeight
            placeholderText: qsTr("Password")
            text: qsTr("Password")
            font.pointSize: loginTextField.font.pointSize
            echoMode: TextInput.Password
            anchors.horizontalCenter: parent.horizontalCenter
            style: TextFieldStyle {
                background: Rectangle {
                    radius: 5
                    border.color: "#744000"
                    border.width: 2
                }
            }
        }

        Button {
            id: connectionButton
            implicitWidth: loginTextField.implicitWidth
            implicitHeight: loginTextField.implicitHeight
            anchors.horizontalCenter: parent.horizontalCenter
            style: ButtonStyle {
                background: Rectangle {
                    color: "#c77900"
                    border.color: "#744000"
                    border.width: 2
                    radius: 10
                }
                label: Text {
                    text: qsTr("Connection")
                    font.pointSize: 18
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
