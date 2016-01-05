import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import QtQuick.Dialogs 1.2

import "../js/Connection.js" as ConnectionScript
import "../js/Option.js" as OptionScript

Item {

    property alias alertConnection: alertConnection

    ColumnLayout {
        id: connectionStateLayout
        spacing: 20
        anchors.centerIn: parent

        TextField {

            property color borderColor: OptionScript.BORDER_BUTTON_COLOR

            id: loginTextField
            placeholderText: qsTr("Login")
            text: qsTr("mda")
            font.pointSize: 18
            implicitWidth: 350
            implicitHeight: 50
            anchors.horizontalCenter: parent.horizontalCenter
            style: TextFieldStyle {
                background: Rectangle {
                    radius: 5
                    border.color: loginTextField.borderColor
                    border.width: 2
                }
            }
        }

        TextField {

            property color borderColor: OptionScript.BORDER_BUTTON_COLOR

            id: passwordTextField
            implicitWidth: loginTextField.implicitWidth
            implicitHeight: loginTextField.implicitHeight
            placeholderText: qsTr("Password")
            text: qsTr("123456")
            font.pointSize: loginTextField.font.pointSize
            echoMode: TextInput.Password
            anchors.horizontalCenter: parent.horizontalCenter
            style: TextFieldStyle {
                background: Rectangle {
                    radius: 5
                    border.color: passwordTextField.borderColor
                    border.width: 2
                }
            }
        }

        MenuButton {
            id: connectionButton
            implicitWidth: loginTextField.implicitWidth
            anchors.horizontalCenter: parent.horizontalCenter
            caption: qsTr("Connection")
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

    function repaint() {
        loginTextField.borderColor = OptionScript.BORDER_BUTTON_COLOR
        passwordTextField.borderColor = OptionScript.BORDER_BUTTON_COLOR
        connectionButton.repaint()
    }
}
