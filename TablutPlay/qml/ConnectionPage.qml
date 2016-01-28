import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import QtQuick.Dialogs 1.2

import "../js/Jeu.js" as JeuScript

ColumnLayout {

    Banner {
        id: banner
        title: qsTr("Connection")
        anchors.top: parent.top
        anchors.topMargin: 0
        anchors.left: parent.left
        anchors.leftMargin: 0
        Layout.fillWidth: true
        previousButton.onClicked: {
            mainForm.menuPage.repaint();
            mainForm.state = "Menu"
        }
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
                onClicked: JeuScript.checkConnectionHTTP(loginTextField.text, passwordTextField.text);
            }
        }

        Label {
            id: newUser
            text: qsTr("New Account ? Sign up")
            color: "#0000ff"
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.top: connectionStateLayout.bottom
            anchors.topMargin: 40
            font.underline: true

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    mainForm.newAccountPage.repaint();
                    mainForm.state = "New Account";
                }
                hoverEnabled: true
                onEntered: parent.color = "#8800ff";
                onExited: parent.color = "#0000ff";
            }
        }
    }

    function repaint() {
        loginTextField.borderColor = FileIO.getColor("BORDER_BUTTON_COLOR");
        passwordTextField.borderColor = FileIO.getColor("BORDER_BUTTON_COLOR");
        connectionButton.repaint();
    }
}
