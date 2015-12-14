function checkConnection() {
    if (loginTextField.text == qsTr("Login") && passwordTextField.text == qsTr("Password"))
        mainForm.state = "base state";
    else
        alertConnection.open();
}

