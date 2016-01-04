.import "../TablutWebServer/tablutServer/nodejsServer/tablutClient.js" as TablutClientScript



function checkConnection() {
    var json = '{"login":"mda", "password":"123456"}';
    TablutClientScript.postHttpTest("172.30.1.1", "tablutWebService/connexion", "8000", json);
}

