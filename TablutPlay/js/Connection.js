.import "Jeu.js" as JeuScript

function checkConnectionHTTP() {
    var json = {"login":mainForm.connectionPage.loginTextField.text, "password":mainForm.connectionPage.passwordTextField.text};
    JeuScript.postHttpRequestServer(JeuScript.serverAddr, JeuScript.serverPath, JeuScript.httpPort, json);
}

function checkConnectionWebSocket(idPartie) {
    mainForm.playPage.wsClient.idPartie = idPartie;
    JeuScript.getHttpRequestServer(JeuScript.serverAddr, JeuScript.socketServerPath, JeuScript.httpPort);
}

