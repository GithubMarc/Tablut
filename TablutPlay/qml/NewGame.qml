import QtQuick 2.5

Rectangle {
    id: mainItem

    border.color: FileIO.getColor("BORDER_BUTTON_COLOR")
    border.width: 2
    radius: 10
    width: 120
    height: 165
    color: "#00000000"

    Rectangle {
        width: 40
        height: width
        radius: width / 2
        color: "#00000000"
        anchors.centerIn: parent
        border.color: "#444444"
        border.width: 2

        Image {
            source: "../icon/plusGame.png"
            width: parent.width
            height: parent.width
            fillMode: Image.PreserveAspectFit
            asynchronous: true
            anchors.fill: parent
        }
    }
}
