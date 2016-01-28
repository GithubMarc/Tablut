import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.1
import QtQuick.Dialogs 1.2

import "../js/Jeu.js" as JeuScript

Rectangle {
    color: "#d0000000"

    PreviousButton {
        id: previous
        anchors.left: parent.left
        anchors.top: parent.top
        onClicked: mainForm.state = "Connection";
    }

    ColumnLayout {
        id: columnContainer
        anchors.centerIn: parent
        spacing: 20

        TextField {
            id: accountEmail
            implicitWidth: 450
            implicitHeight: 45
            font.pointSize: 18
            placeholderText: qsTr("Email")
            //validator: RegExpValidator { regExp:/\w+(.?\w+)*@\w+(.\w+){1,}/ }
            onAccepted: console.log("regexp ok");
            Layout.alignment: Qt.AlignLeft | Qt.AlignVCenter
        }

        TextField {
            id: accountPassword
            implicitWidth: 450
            implicitHeight: 45
            font.pointSize: 18
            placeholderText: qsTr("Password")
            echoMode: TextInput.Password
            Layout.alignment: Qt.AlignLeft | Qt.AlignVCenter
        }

        TextField {
            id: accountConfirmPassword
            implicitWidth: 450
            implicitHeight: 45
            font.pointSize: 18
            placeholderText: qsTr("Password again")
            echoMode: TextInput.Password
            Layout.alignment: Qt.AlignLeft | Qt.AlignVCenter
        }

        Button {
            id: save
            text: qsTr("Save")
            implicitHeight: 35
            Layout.alignment: Qt.AlignRight

            onClicked: {
                if (/*accountEmail.acceptableInput && */accountPassword.text == accountConfirmPassword.text) JeuScript.sendAccountCreation(accountEmail.text, accountPassword.text);
                /*else if (!accountEmail.acceptableInput){
                    messageDialog.title = qsTr("An error occured");
                    messageDialog.text = qsTr("L'email n'est pas au bon format. Merci de réessayer avec une email valide.");
                    messageDialog.icon = StandardIcon.Warning;
                    messageDialog.visible = true;
                } */else /*if (accountPassword.text != accountConfirmPassword.text) */{
                    messageDialog.title = qsTr("An error occured");
                    messageDialog.text = qsTr("Le mot de passe n'est pas le même.");
                    messageDialog.icon = StandardIcon.Warning;
                    messageDialog.visible = true;
                    accountPassword.text = "";
                    accountConfirmPassword.text = "";
                }
            }
        }
    }
}
