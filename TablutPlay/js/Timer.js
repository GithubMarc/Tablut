var d = new Date(0, 0, 0, 0, 0, 0, 0);

function updateTime() {
    d.setMilliseconds(d.getMilliseconds() + 1000)
    mainForm.playPage.timerLabel.timeLabel.text = qsTr(d.toTimeString());
}

function startTimer() {
    mainForm.playPage.timerLabel.timer.running = true;
}

function stopTimer() {
    mainForm.playPage.timerLabel.timer.running = false;
}

function resetTimer() {
    d = new Date(0, 0, 0, 0, 0, 0, 0);
}

function resumePart() {
    mainForm.state = "base state";
    startTimer();
}

