import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.1

import "../js/Connection.js" as ConnectionScript

Rectangle {
    id: mainItem

    property string nom: ""
    property string statut: ""
    property int idPartie

    property alias field: field

    border.color: FileIO.getColor("BORDER_BUTTON_COLOR")
    border.width: 2
    radius: 10
    width: 120
    height: 165
    color: "#00000000"

    ColumnLayout {
        spacing: 2
        anchors.fill: parent

        Grille {
            id: field
            width: 100
            height: width
            enabled: false
            Layout.alignment: Qt.AlignCenter
        }

        GridLayout {
            property int fontSize: 10

            Layout.alignment: Qt.AlignHCenter | Qt.AlignTop
            columns: 2
            columnSpacing: 3
            rowSpacing: 5


            Label {
                text: qsTr("nom:")
                font.pointSize: parent.fontSize
                Layout.alignment: Qt.AlignCenter
            }

            Label {
                text: qsTr(nom)
                font.pointSize: parent.fontSize
                Layout.alignment: Qt.AlignCenter
            }

            Label {
                text: qsTr("statut:")
                font.pointSize: parent.fontSize
                Layout.alignment: Qt.AlignCenter
            }

            Label {
                text: qsTr(statut)
                font.pointSize: parent.fontSize
                Layout.alignment: Qt.AlignCenter
            }
        }
    }

    MouseArea {
        anchors.fill: parent
        onClicked: ConnectionScript.checkConnectionWebSocket(mainItem.idPartie);
    }
}
