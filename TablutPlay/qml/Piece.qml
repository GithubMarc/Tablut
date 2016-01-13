import QtQuick 2.0

Rectangle {
    property string team

    id: piece
    radius: width / 2
    enabled: true
    clip: false
    anchors.centerIn: parent
}
