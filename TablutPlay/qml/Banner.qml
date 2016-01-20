import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.1
import QtQuick.Controls.Styles 1.4

Rectangle {
    id: banner
    height: previousButton.implicitHeight + 2 * previousButton.anchors.margins
    color: FileIO.getColor("INSIDE_BUTTON_COLOR")

    property bool isPreviousButtonVisible: true
    property string title: ""
    property alias previousButton: previousButton

    PreviousButton {
        id: previousButton
        anchors.left: parent.left
        anchors.top: parent.top
        visible: banner.isPreviousButtonVisible
    }

    Label {
        id: title
        text: qsTr(banner.title)
        color: FileIO.getColor("FONT_BUTTON_COLOR")
        style: Text.Outline
        styleColor: FileIO.getColor("BORDER_BUTTON_COLOR")
        font.family: FileIO.getColor("FONT_FAMILY")
        font.pointSize: 24
        anchors.centerIn: parent
    }

    Rectangle {
        id: verticalSeparator
        width: 1
        height: parent.height
        color: FileIO.getColor("BORDER_BUTTON_COLOR")
        anchors.left: previousButton.right
        anchors.leftMargin: 5
        anchors.top: parent.top
        anchors.topMargin: 0
        visible: banner.isPreviousButtonVisible
    }

    Rectangle {
        id: horizontalSeparator
        height: 1
        width: parent.width
        color: FileIO.getColor("BORDER_BUTTON_COLOR")
        anchors.top: previousButton.bottom
        anchors.topMargin: 5
        anchors.left: parent.left
        anchors.leftMargin: 0
    }

    function repaint() {
        banner.color = FileIO.getColor("INSIDE_BUTTON_COLOR");
        title.color = FileIO.getColor("FONT_BUTTON_COLOR");
        title.font.family = FileIO.getColor("FONT_FAMILY");
        title.styleColor = FileIO.getColor("BORDER_BUTTON_COLOR");
        verticalSeparator.color = FileIO.getColor("BORDER_BUTTON_COLOR");
        horizontalSeparator.color = FileIO.getColor("BORDER_BUTTON_COLOR");
    }
}
