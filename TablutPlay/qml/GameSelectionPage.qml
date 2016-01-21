import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.1

ColumnLayout {
    spacing: 5

    Banner {
        id: banner
        title: qsTr("Game Selection")
        anchors.top: parent.top
        anchors.topMargin: 0
        anchors.left: parent.left
        anchors.leftMargin: 0
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
            anchors.centerIn: parent
            Grille {
                width: 100
                height: 100
            }
        }
    }
}
