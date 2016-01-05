import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4

import "../js/Option.js" as OptionScript

Button {

    property color backgroundColor: OptionScript.INSIDE_BUTTON_COLOR
    property color backgroundBorderColor: OptionScript.BORDER_BUTTON_COLOR
    property string fontFamily: OptionScript.FONT_FAMILY
    property color labelBorderColor: OptionScript.BORDER_BUTTON_COLOR
    property color labelColor: OptionScript.FONT_BUTTON_COLOR

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
        backgroundColor = OptionScript.INSIDE_BUTTON_COLOR;
        backgroundBorderColor = OptionScript.BORDER_BUTTON_COLOR;
        fontFamily = OptionScript.FONT_FAMILY;
        labelBorderColor = OptionScript.BORDER_BUTTON_COLOR;
        labelColor = OptionScript.FONT_BUTTON_COLOR;
    }
}

