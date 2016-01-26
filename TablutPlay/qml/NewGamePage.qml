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
        currentIndex: -1
        anchors.left: columnContainer.left
        anchors.leftMargin: 0
        anchors.bottom: columnContainer.top
        anchors.bottomMargin: columnContainer.spacing
    }

    ComboBox {
        id: teamSelector
        model: ListModel {
            ListElement { text: "Black" }
            ListElement { text: "Red" }
        }
        currentIndex: -1
        anchors.right: columnContainer.right
        anchors.rightMargin: 0
        anchors.bottom: columnContainer.top
        anchors.bottomMargin: columnContainer.spacing
    }

    ColumnLayout {
        id: columnContainer
        anchors.centerIn: parent

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

            onClicked: JeuScript.sendGameCreation(gameName.text, typeGameSelector.currentText);

            MessageDialog {
                id: textAlredayExists
                title: qsTr("File already exists")
                text: qsTr("The file name you entered already exists. Please enter a new name and try again.")
                icon: StandardIcon.Warning
                visible: false
            }
        }
    }
}
