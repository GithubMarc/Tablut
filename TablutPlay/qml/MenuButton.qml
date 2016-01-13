import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4

Button {

    property color backgroundColor: FileIO.getColor("INSIDE_BUTTON_COLOR");
    property color backgroundBorderColor: FileIO.getColor("BORDER_BUTTON_COLOR");
    property string fontFamily: FileIO.getColor("FONT_FAMILY");
    property color labelBorderColor: FileIO.getColor("BORDER_BUTTON_COLOR");
    property color labelColor: FileIO.getColor("FONT_BUTTON_COLOR");

    property string caption: ""

    implicitWidth: 350
    implicitHeight: 50
    style: ButtonStyle {
        background: Rectangle {
            color: backgroundColor
            border.color: backgroundBorderColor
            border.width: 2
            radius: 10
        }
        label: Text {
            text: caption
            font.family: fontFamily
            style: Text.Outline
            styleColor: labelBorderColor
            font.pointSize: 22
            color: labelColor
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
        }
    }

    function repaint() {
        backgroundColor = FileIO.getColor("INSIDE_BUTTON_COLOR");
        backgroundBorderColor = FileIO.getColor("BORDER_BUTTON_COLOR");
        fontFamily = FileIO.getColor("FONT_FAMILY");
        labelBorderColor = FileIO.getColor("BORDER_BUTTON_COLOR");
        labelColor = FileIO.getColor("FONT_BUTTON_COLOR");
    }
}

