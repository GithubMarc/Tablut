.import "TablutClient.js" as TablutClientScript

function checkConnection() {
    var json = {"login":loginTextField.text, "password":passwordTextField.text};
    TablutClientScript.postHttpRequestServer(TablutClientScript.serverAddr, TablutClientScript.serverPath, TablutClientScript.httpPort, json);
}

function checkConnection2() {
    TablutClientScript.getHttpRequestServer(TablutClientScript.serverAddr, TablutClientScript.socketServerPath, TablutClientScript.httpPort);
}

