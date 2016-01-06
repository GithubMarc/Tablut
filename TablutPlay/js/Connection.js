.import "Jeu.js" as JeuScript

function checkConnection() {
    var json = {"login":loginTextField.text, "password":passwordTextField.text};
    JeuScript.postHttpRequestServer(JeuScript.serverAddr, JeuScript.serverPath, JeuScript.httpPort, json);
}

function checkConnection2() {
    JeuScript.getHttpRequestServer(JeuScript.serverAddr, JeuScript.socketServerPath, JeuScript.httpPort);
}

