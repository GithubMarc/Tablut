import QtQuick 2.5
import QtQuick.Controls 1.4
import QtGraphicalEffects 1.0

import "../js/Jeu.js" as JeuScript

Item {
    id: mainItem
    width: secondRect.width
    height: mainRect.height + secondRect.height + secondRect.anchors.topMargin

    property alias mainRect: mainRect
    property alias secondRect: secondRect
    property int gap: 6
    property color borderColor: FileIO.getColor("BORDER_BUTTON_COLOR");
    property int listViewDelegateHeight: 30

    Rectangle {
        id: mainRect
        width: 40
        height: width
        radius: width / 2
        anchors.horizontalCenter: parent.horizontalCenter
        color: borderColor
        z: 0
    }

    Rectangle {
        id: imageContainer
        width: mainRect.width - mainItem.gap
        height: width
        radius: width / 2
        anchors.centerIn: mainRect
        z: 2

        Image {
            id: image
            width: parent.width
            height: width
            source: "../icon/freestyle-ski-tricks.jpg"
            smooth: true
            visible: false
        }

        Image {
            id: mask
            width: parent.width
            height: width
            source: "../icon/mask.png"
            smooth: true
            visible: false
        }

        OpacityMask {
            anchors.fill: image
            source: image
            maskSource: mask

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    if (!menu.visible) {
                        mainItem.height += menuContainer.height;
                        menuContainer.visible = true;
                    } else {
                        mainItem.height -= menuContainer.height;
                        menuContainer.visible = false;
                    }

                }
            }
        }
    }

    Rectangle {
        id: secondRect
        width: Math.max(mainRect.width * 2, pseudoLabel.width + mainItem.gap) + 2 * border.width
        height: 19
        radius: 4
        anchors.top: mainRect.bottom
        anchors.topMargin: - mainItem.gap
        anchors.horizontalCenter: parent.horizontalCenter
        border.color: mainItem.borderColor
        border.width: mainItem.gap / 2
        z: 1

        Label {
            id: pseudoLabel
            text: userEmail
            anchors.centerIn: parent
            verticalAlignment: Text.AlignVCenter
        }
    }

    ListModel {
        id: listModel
        ListElement {label: qsTr("Settings"); key:"setting"}
        ListElement {label: qsTr("Logout"); key:"logout"}
    }

    Rectangle {
        id: menuContainer
        width: secondRect.width
        height: menu.height + 2 * border.width
        radius: 5
        border.color: mainItem.borderColor
        border.width: mainItem.gap / 2
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: secondRect.bottom
        anchors.topMargin: 0
        visible: false

        ListView {
            id: menu
            width: parent.width - 2 * parent.border.width
            height: mainItem.listViewDelegateHeight * listModel.count
            anchors.centerIn: parent
            model: listModel
            delegate: Item {
                width: parent.width
                height: mainItem.listViewDelegateHeight
                Rectangle {
                    id: selectionIndicator
                    width: 5
                    height: parent.height - 8
                    color: mainItem.borderColor
                    anchors.verticalCenter: parent.verticalCenter
                    anchors.left: parent.left
                    anchors.leftMargin: 3
                    visible: false
                }
                Label {
                    text: label
                    verticalAlignment: Text.AlignVCenter
                    horizontalAlignment: Text.AlignHCenter
                    anchors.centerIn: parent
                }
                MouseArea {
                    anchors.fill: parent
                    hoverEnabled: true
                    onEntered: selectionIndicator.visible = true;
                    onExited: selectionIndicator.visible = false;
                    onClicked: userCommand(key)

                    function userCommand(usrCommand) {
                        switch (usrCommand) {
                        case "logout":
                            JeuScript.getHttpRequestServer(JeuScript.serverAddr, JeuScript.deconnectionPath, JeuScript.httpPort);
                            break;
                        default:
                            break;
                        }
                    }
                }
            }
        }
    }

    function repaint() {
        menuContainer.visible = false;
        mainItem.borderColor = FileIO.getColor("BORDER_BUTTON_COLOR");
    }
}
