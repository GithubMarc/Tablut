import QtQuick 2.5
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4


ColumnLayout {
    spacing: 5

    Banner {
        id: banner
        title: qsTr("Menu")
        anchors.top: parent.top
        anchors.topMargin: 0
        anchors.left: parent.left
        anchors.leftMargin: 0
        Layout.fillWidth: true
        isPreviousButtonVisible: false
    }

    Item {
        Layout.fillHeight: true
        Layout.fillWidth: true

        ColumnLayout {
            id: menuStateLayout
            spacing: 20
            anchors.centerIn: parent


            MenuButton {
                id: onlineButton
                caption: qsTr("Online")
                Layout.alignment: Qt.AlignCenter
                onClicked: {
                    if (!userConnected) {
                        mainForm.connectionPage.repaint();
                        mainForm.state = "Connection";
                    } else {
                        mainForm.gameSelectionPage.repaint();
                        mainForm.state = "Game";
                    }
                }
            }

            MenuButton {
                id: offlineButton
                caption: qsTr("Offline")
                Layout.alignment: Qt.AlignCenter
                enabled: false
                onClicked: mainForm.state = "base state";
            }

            MenuButton {
                id: optionButton
                caption: qsTr("Option")
                Layout.alignment: Qt.AlignCenter

                onClicked: {
                    mainForm.state = "Option";
                }
            }
        }
    }

    function repaint() {
        onlineButton.repaint();
        offlineButton.repaint();
        optionButton.repaint();
        banner.repaint();
    }
}
