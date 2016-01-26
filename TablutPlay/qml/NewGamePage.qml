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
        onClicked: {
            mainForm.state = "Game";
            mainForm.gameSelectionPage.repaint();
        }
    }

    ComboBox {
        id: typeGameSelector
        model: ListModel {
            ListElement { text: "Tablut" }
        }
        anchors.left: columnContainer.left
        anchors.leftMargin: 0
        anchors.bottom: columnContainer.top
        anchors.bottomMargin: columnContainer.spacing

        Component.onCompleted: currentIndex = -1;
    }

    ComboBox {
        id: teamSelector
        model: ListModel {
            ListElement { text: "Black" }
            ListElement { text: "Red" }
        }
        anchors.right: columnContainer.right
        anchors.rightMargin: 0
        anchors.bottom: columnContainer.top
        anchors.bottomMargin: columnContainer.spacing

        Component.onCompleted: currentIndex = -1;
    }

    ColumnLayout {
        id: columnContainer
        anchors.centerIn: parent
        spacing: 20

        TextField {
            id: gameName
            implicitWidth: 450
            implicitHeight: 45
            font.pointSize: 18
            placeholderText: qsTr("Name")
            Layout.alignment: Qt.AlignLeft | Qt.AlignVCenter
        }

        Button {
            id: save
            text: qsTr("Save")
            implicitHeight: 35
            Layout.alignment: Qt.AlignRight

            onClicked: {
                if (gameName.text != "" && typeGameSelector.currentIndex != -1 && teamSelector.currentIndex != -1) JeuScript.sendGameCreation(gameName.text, typeGameSelector.currentText);
                else if (gameName.text == "") {
                    messageDialog.title = qsTr("An error occured");
                    messageDialog.text = qsTr("You didn't enter a valide game's name. Please check and try again.");
                    messageDialog.icon = StandardIcon.Critical
                    messageDialog.visible = true;
                } else if (typeGameSelector.currentIndex == -1) {
                    messageDialog.title = qsTr("An error occured");
                    messageDialog.text = qsTr("You didn't choose for a game. Please check and try again.");
                    messageDialog.icon = StandardIcon.Critical
                    messageDialog.visible = true;
                } else {
                    messageDialog.title = qsTr("An error occured");
                    messageDialog.text = qsTr("You didn't choose for a team. Please check and try again.");
                    messageDialog.icon = StandardIcon.Critical
                    messageDialog.visible = true;
                }
            }
        }
    }
}
