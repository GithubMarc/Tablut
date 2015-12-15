import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import QtQuick.Dialogs 1.2

import "Option.js" as OptionScript

Item {
    Button {
        id: previous
        x: 0
        y: 0
        text: "Previous"
        onClicked: mainForm.state = "Menu";
    }

    GridLayout {
        anchors.centerIn: parent
        columns: 2
        columnSpacing: 30
        rowSpacing: 20

        Label {
            text: qsTr("Background")
            color: "#000000"
            font.pointSize: 22
            font.family: OptionScript.FONT_FAMILY
            anchors.left: parent.left
            anchors.leftMargin: 0
        }

        Button {
            id: backgroundButtonColorSelector
            implicitWidth: 170
            implicitHeight: 50
            style: ButtonStyle {
                background: Rectangle {
                    color: OptionScript.INSIDE_BUTTON_COLOR
                    border.color: OptionScript.BORDER_BUTTON_COLOR
                    border.width: 2
                    radius: 10
                }
                label: ButtonLabel { text: qsTr("Select Color") }
            }
            anchors.right: parent.right
            anchors.rightMargin: 0
            onClicked: {
                colorDialog.idSelector = 0;
                colorDialog.visible = true;
            }
        }

        Label {
            text: qsTr("Inside Button")
            color: "#000000"
            font.pointSize: 22
            font.family: OptionScript.FONT_FAMILY
            anchors.left: parent.left
            anchors.leftMargin: 0
        }

        Rectangle {
            id: insideButtonColorSelector
            width: 170
            height: 50
            color: OptionScript.INSIDE_BUTTON_COLOR
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
            font.family: OptionScript.FONT_FAMILY
            anchors.left: parent.left
            anchors.leftMargin: 0
        }

        Rectangle {
            id: borderButtonColorSelector
            width: 170
            height: 50
            color: OptionScript.BORDER_BUTTON_COLOR
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
    }

    ColorDialog {

        property int idSelector

        id: colorDialog
        title: "Please select a color"
        visible: false
        onAccepted: refreshColor();


        function refreshColor() {
            switch (idSelector) {
            case 0:
                OptionScript.BACKGROUND_COLOR = colorDialog.color;
                applicationWindow.color = colorDialog.color;
                break;
            case 1:
                OptionScript.INSIDE_BUTTON_COLOR = colorDialog.color;
                insideButtonColorSelector.color = colorDialog.color;
            break;
            case 2:
                OptionScript.BORDER_BUTTON_COLOR = colorDialog.color;
                borderButtonColorSelector.color = colorDialog.color;
            break;
            default:
            break;
            }
        }
    }
}



