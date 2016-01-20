import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.1
import QtQuick.Dialogs 1.2

Rectangle {
    color: "#d0000000"

    PreviousButton {
        id: previous
        anchors.left: parent.left
        anchors.top: parent.top
        onClicked: {
            mainForm.state = "Option";
            mainForm.menuPage.repaint();
        }
    }

    ColumnLayout {
        anchors.centerIn: parent

        Label {
            id: chooseName
            text: qsTr("Please enter a new config file's name")
            font.pointSize: 18
            color: "#ffffff"
            Layout.alignment: Qt.AlignLeft
        }

        TextField {
            id: fileName
            implicitWidth: 450
            implicitHeight: 45
            font.pointSize: 18
            Layout.alignment: Qt.AlignLeft
        }

        Button {
            id: save
            text: qsTr("Save")
            implicitHeight: 35
            Layout.alignment: Qt.AlignRight

            onClicked: {
                if (fileName.text != "") {
                    if (FileIO.createNewConfigFile(fileName.text)) mainForm.state = "Option";
                    else textAlredayExists.visible = true;
                }
            }

            MessageDialog {
                id: textAlredayExists
                title: qsTr("File already exists")
                text: qsTr("The file name you entered already exists. Please enter a new name and try again.")
                icon: StandardIcon.Warning
                visible: false

                onAccepted: fileName.text = "";
            }
        }
    }
}
