import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import QtQuick.Dialogs 1.2

Item {
    id: mainItem

    property alias fileOption: fileOption

    Button {
        id: previous
        x: 0
        y: 0
        text: "Previous"
        onClicked: {
            mainForm.state = "Menu";
            mainForm.menuPage.repaint();
        }
    }

    Button {
        id: newConfigFile
        text: qsTr("New Config")
        anchors.bottom: fileOption.top
        anchors.margins: 10
        anchors.right: fileOption.right
        anchors.rightMargin: 0

        onClicked: mainForm.state = "New Config"
    }

    RowLayout {
        id: fileOption
        anchors.bottom: colorOption.top
        anchors.bottomMargin: 20
        anchors.left: colorOption.left
        anchors.leftMargin: 0
        anchors.right: colorOption.right
        anchors.rightMargin: 0
        spacing: 0

        Label {
            id: chooseFile
            text: qsTr("Choose file...")
            font.pointSize: 10
            color: "#000000"
        }

        TextField {
            id: path
            height: 30
            text: FileIO.getPath();
            implicitWidth: colorOption.implicitWidth - chooseFile.implicitWidth - browse.implicitWidth - 3
            anchors.left: chooseFile.right
        }

        Button {
            id: browse
            text: qsTr("Browse")
            onClicked: browseFile.visible = true;

            FileDialog {
                id: browseFile
                title: qsTr("Please select a config file")
                folder: "../config"
                nameFilters: "Config files (*.config)"
                visible: false

                onAccepted: {
                    var temp = browseFile.fileUrl.toString();
                    path.text = temp.substring(8);
                    openConfigFile();
                }

                function openConfigFile() {
                    FileIO.setPath(path.text);
                    mainItem.repaint();
                }
            }
        }
    }

    GridLayout {
        id: colorOption
        anchors.centerIn: parent
        columns: 2
        columnSpacing: 30
        rowSpacing: 20
        visible: true

        Label {
            text: qsTr("Background")
            color: "#000000"
            font.pointSize: 22
            font.family: FileIO.getColor("FONT_FAMILY");
            anchors.left: parent.left
            anchors.leftMargin: 0
        }

        MenuButton {
            id: backgroundButtonColorSelector
            caption: qsTr("Select Color")
            implicitWidth: 170
            anchors.right: parent.right
            anchors.rightMargin: 0

            onClicked: {
                colorDialog.color = FileIO.getColor("BACKGROUND_COLOR");
                colorDialog.idSelector = 0;
                colorDialog.visible = true;
            }
        }

        Label {
            text: qsTr("Inside Button")
            color: "#000000"
            font.pointSize: 22
            font.family: FileIO.getColor("FONT_FAMILY");
            anchors.left: parent.left
            anchors.leftMargin: 0
        }

        Rectangle {
            id: insideButtonColorSelector
            width: 170
            height: 50
            color: FileIO.getColor("INSIDE_BUTTON_COLOR");
            border.color: "#000000"
            border.width : 3
            anchors.right: parent.right
            anchors.rightMargin: 0

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    colorDialog.color = insideButtonColorSelector.color
                    colorDialog.idSelector = 1;
                    colorDialog.visible = true;
                }
            }
        }

        Label {
            text: qsTr("Border Button")
            color: "#000000"
            font.pointSize: 22
            font.family: FileIO.getColor("FONT_FAMILY");
            anchors.left: parent.left
            anchors.leftMargin: 0
        }

        Rectangle {
            id: borderButtonColorSelector
            width: 170
            height: 50
            color: FileIO.getColor("BORDER_BUTTON_COLOR");
            border.color: "#000000"
            border.width : 3
            anchors.right: parent.right
            anchors.rightMargin: 0

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    colorDialog.color = borderButtonColorSelector.color
                    colorDialog.idSelector = 2;
                    colorDialog.visible = true;
                }
            }
        }

        Label {
            text: qsTr("Font Button")
            color: "#000000"
            font.pointSize: 22
            font.family: FileIO.getColor("FONT_FAMILY");
            anchors.left: parent.left
            anchors.leftMargin: 0
        }

        Rectangle {
            id: fontButtonColorSelector
            width: 170
            height: 50
            color: FileIO.getColor("FONT_BUTTON_COLOR");
            border.color: "#000000"
            border.width : 3
            anchors.right: parent.right
            anchors.rightMargin: 0

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    colorDialog.color = fontButtonColorSelector.color
                    colorDialog.idSelector = 3;
                    colorDialog.visible = true;
                }
            }
        }
    }

    RowLayout {
        id: buttonChoice
        anchors.top: colorOption.bottom
        anchors.topMargin: 20
        anchors.right: colorOption.right
        anchors.left: colorOption.left

        MenuButton {
            id: defaultPath
            caption: qsTr("default")
            implicitWidth: 95
            anchors.left: parent.left

            onClicked: {
                if(path.text != "") FileIO.setDefaultPath(path.text);
            }
        }

        MenuButton {
            id: defaultValuesButton
            caption: qsTr("Reset")
            implicitWidth: 85
            anchors.right: parent.right

            onClicked: {
                FileIO.setDefaultColor();
                mainItem.repaint();
            }
        }
    }

    function repaint() {
        backgroundButtonColorSelector.repaint();
        defaultValuesButton.repaint();
        defaultPath.repaint();
        applicationWindow.color = FileIO.getColor("BACKGROUND_COLOR");
        insideButtonColorSelector.color = FileIO.getColor("INSIDE_BUTTON_COLOR");
        borderButtonColorSelector.color = FileIO.getColor("BORDER_BUTTON_COLOR");
        fontButtonColorSelector.color = FileIO.getColor("FONT_BUTTON_COLOR");
    }

    ColorDialog {

        property int idSelector

        id: colorDialog
        title: "Please select a color"
        visible: false
        onAccepted: refreshColor();

        function refreshColor() {
            switch (colorDialog.idSelector) {
            case 0:
                FileIO.setColor("BACKGROUND_COLOR", colorDialog.color);
            break;
            case 1:
                FileIO.setColor("INSIDE_BUTTON_COLOR", colorDialog.color);
            break;
            case 2:
                FileIO.setColor("BORDER_BUTTON_COLOR", colorDialog.color);
            break;
            case 3:
                FileIO.setColor("FONT_BUTTON_COLOR", colorDialog.color);
            break;
            default:
            break;
            }

            mainItem.repaint();
        }
    }
}



