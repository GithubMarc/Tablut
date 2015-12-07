import QtQuick 2.4
import QtQuick.Controls 1.3
import QtQuick.Layouts 1.1

Item {
    id: item1
    width: 560
    height: 560
    anchors.centerIn: parent.Center

    Rectangle {
        id: rectangle1
        border.width: 1
        anchors.centerIn: parent.Center

        Grille{
            anchors.right: parent.right
            anchors.rightMargin: 0
            anchors.bottomMargin: 0
            anchors.left: parent.left
            anchors.bottom: parent.bottom
            anchors.fill: parent
            //anchors.centerIn: parent
        }
    }
}
