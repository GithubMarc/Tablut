var d = new Date(0, 0, 0, 0, 0, 0, 0);

function updateTime() {
    d.setMilliseconds(d.getMilliseconds() + 1000)
    timeLabel.text = qsTr(d.toTimeString());
}

function startTimer() {
    timerLabel.timer.running = true;
}

function stopTimer() {
    timerLabel.timer.running = false;
}

function resetTimer() {
    d = new Date(0, 0, 0, 0, 0, 0, 0);
}

function resumePart() {
    mainForm.state = "base state";
    mainForm.timerLabel.timer.running = true;
}

