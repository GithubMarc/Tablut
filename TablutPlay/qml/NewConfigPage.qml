import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.1
import QtQuick.Dialogs 1.2

Rectangle {
    color: "#d0000000"

    Button {
        id: previous
        x: 0
        y: 0
        text: "Previous"
        onClicked: {
            mainForm.state = "Option";
            mainForm.menuPage.repaint();
        }
    }

    ColumnLayout {
        anchors.verticalCenter: parent.verticalCenter
        anchors.left: parent.left
        anchors.leftMargin: 50

        Label {
            id: chooseName
            text: qsTr("Please enter a new config file's name")
            font.pointSize: 18
            color: "#ffffff"
            anchors.left: parent.left
            anchors.leftMargin: 0
        }

        TextField {
            id: fileName
            implicitWidth: 450
            implicitHeight: 45
            font.pointSize: 18
            anchors.left: parent.left
            anchors.leftMargin: 0
        }

        Button {
            id: save
            text: qsTr("Save")
            implicitHeight: 35
            anchors.right: parent.right
            anchors.rightMargin: 0

            onClicked: {
                if (fileName.text != "") {
                    if (FileIO.createNewConfigFile(fileName.text)) mainForm.state = "Option";
                    else textAlredayExists.visible = true;
                }
            }

            MessageDialog {
                id: textAlredayExists
                title: qsTr("File already exists")
                text: qsTr("The file name you entered already exists. please enter a new name and try again.")
                icon: StandardIcon.Warning
                visible: false

                onAccepted: fileName.text = "";
            }
        }
    }
}
