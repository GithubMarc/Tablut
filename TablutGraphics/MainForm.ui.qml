import QtQuick 2.4
import QtQuick.Controls 1.3
import QtQuick.Layouts 1.1

Item {
    id: firstItem
    anchors.horizontalCenter: parent.horizontalCenter

    ColumnLayout {
        id: columnLayout1
        width: firstItem.width
        height: firstItem.height
        spacing: 0

        TimerLabel {
            id: time
            anchors.horizontalCenter: parent.horizontalCenter
        }

        Grille {
            id: field
            y: 42
            width: 518
            height: 518
            anchors.horizontalCenter: parent.horizontalCenter
        }
    }
}
