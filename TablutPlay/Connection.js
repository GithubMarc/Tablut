.import "../TablutWebServer/tablutServer/nodejsServer/tablutClient.js" as TablutClientScript



function checkConnection() {
    var json = {"login":loginTextField.text, "password":passwordTextField.text};
    TablutClientScript.postHttpRequestServer(TablutClientScript.serverAddr, TablutClientScript.serverPath, TablutClientScript.httpPort, json);
}

