import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import QtQuick.Dialogs 1.2

import "../js/Jeu.js" as JeuScript

ColumnLayout {

    property alias alertConnection: alertConnection
    property alias connectionInformation: connectionInformation
    property alias loginTextField: loginTextField
    property alias passwordTextField: passwordTextField

    Banner {
        id: banner
        title: qsTr("Connection")
        anchors.top: parent.top
        anchors.topMargin: 0
        anchors.left: parent.left
        anchors.leftMargin: 0
        Layout.fillWidth: true
        previousButton.onClicked: mainForm.state = "Menu"
    }


    Item {
        Layout.fillHeight: true
        Layout.fillWidth: true

        ColumnLayout {
            id: connectionStateLayout
            spacing: 20
            anchors.centerIn: parent

            TextField {

                property color borderColor: FileIO.getColor("BORDER_BUTTON_COLOR");

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

                property color borderColor: FileIO.getColor("BORDER_BUTTON_COLOR");

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
                onClicked: JeuScript.checkConnectionHTTP();
            }
        }

        Label {
            id: connectionInformation
            width: 100
            height: 50
            text: qsTr("Connection...")
            font.pointSize: 12
            color: "#000000"
            anchors.left: connectionStateLayout.left
            anchors.leftMargin: 0
            anchors.top: connectionStateLayout.bottom
            anchors.topMargin: 5
            visible: false
        }

        MessageDialog {
            id: alertConnection
            title: "Authentication failed"
            text: "Your login or your password may be wrong. Please try again."
            icon: StandardIcon.Critical
            visible: false

            onAccepted: connectionInformation.visible = false;
        }
    }

    function repaint() {
        loginTextField.borderColor = FileIO.getColor("BORDER_BUTTON_COLOR");
        passwordTextField.borderColor = FileIO.getColor("BORDER_BUTTON_COLOR");
        connectionButton.repaint();
    }
}
