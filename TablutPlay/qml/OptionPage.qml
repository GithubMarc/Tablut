import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import QtQuick.Dialogs 1.2
import Qt.labs.folderlistmodel 2.1

ColumnLayout {
    id: mainItem

    //property alias fileOption: fileOption

    Banner {
        id: banner
        title: qsTr("Option")
        anchors.top: parent.top
        anchors.topMargin: 0
        anchors.left: parent.left
        anchors.leftMargin: 0
        Layout.fillWidth: true
        previousButton.onClicked: {
            mainForm.state = "Menu";
            mainForm.menuPage.repaint();
        }
    }

    Item {
        Layout.fillHeight: true
        Layout.fillWidth: true

        FolderListModel {
            id: folderModel2
            folder: "../config"
            nameFilters: ["*.config"]

            Component.onCompleted: {
                comboBox.isActive = true;
                comboBox.currentIndex = -1;
            }
        }

        ColumnLayout {
            anchors.centerIn: parent
            spacing: 20

            ComboBox {
                property bool isActive: false

                id: comboBox
                model: folderModel2
                implicitWidth: 200
                textRole: "fileBaseName"
                onCurrentIndexChanged: {
                    if (isActive && currentIndex != -1) {
                        loadConfig(folderModel2.get(currentIndex, "filePath"));
                    }
                }

                Layout.alignment: Qt.AlignCenter

                function loadConfig(path) {
                    FileIO.setPath(path);
                    mainItem.repaint();
                }
            }

            GridLayout {
                id: colorOption
                Layout.alignment: Qt.AlignCenter
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
                Layout.fillHeight: true
                Layout.fillWidth: true

                MenuButton {
                    id: defaultPath
                    caption: qsTr("default")
                    implicitWidth: 95
                    Layout.alignment: Qt.AlignLeft

                    onClicked: {
                        FileIO.setDefaultPath(folderModel2.get(comboBox.currentIndex, "filePath"));
                    }
                }

                MenuButton {
                    id: newConfigButton
                    caption: qsTr("New")
                    implicitWidth: 85
                    Layout.alignment: Qt.AlignCenter

                    onClicked: {
                        FileIO.setDefaultColor();
                        mainItem.repaint();
                    }
                }

                MenuButton {
                    id: defaultValuesButton
                    caption: qsTr("Reset")
                    implicitWidth: 85
                    Layout.alignment: Qt.AlignRight

                    onClicked: {
                        FileIO.setDefaultColor();
                        mainItem.repaint();
                    }
                }
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



