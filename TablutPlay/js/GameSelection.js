.import QtQuick 2.5 as ComponentScript

function createGrid(container, id) {
    var component = Qt.createComponent("../qml/GameSelectionGrid.qml");
    if (component.status == ComponentScript.Component.Ready){
        return component.createObject(container);
    }
}

function clearPage() {
    mainForm.gameSelectionPage.listGameSelection.length = 0;
    var count = mainForm.gameSelectionPage.gridContainer.children.length;
    for (var i = 0; i < count; i++) {
        mainForm.gameSelectionPage.gridContainer.children[0].destroy();
    }
}
