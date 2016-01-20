import QtQuick 2.0
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4

Button {
    iconSource: "../icon/previousButton.png"
    style: ButtonStyle {
        background: Rectangle {
            color: "#00000000"
        }
    }
    implicitWidth: 29
    implicitHeight: 50
    anchors.margins: 5
}
