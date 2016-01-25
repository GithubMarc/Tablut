import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.1

import "../js/GameSelection.js" as GameSelectionScript

ColumnLayout {
    spacing: 5

    property alias gridContainer: gridContainer
    property var listGameSelection: new Array()

    Banner {
        id: banner
        title: qsTr("Game Selection")
        anchors.top: parent.top
        anchors.topMargin: 0
        Layout.fillWidth: true
        isPreviousButtonVisible: true
        previousButton.onClicked: {
            mainForm.state = "Menu";
        }
    }

    Item {
        Layout.fillHeight: true
        Layout.fillWidth: true

        GridLayout {
            id: gridContainer
            columns: applicationWindow.width / 150
            columnSpacing: 30
            rowSpacing: 30
            anchors.centerIn: parent
        }
    }

    function repaint() {

    }
}
