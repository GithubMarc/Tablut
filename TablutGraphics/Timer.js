var d = new Date(0, 0, 0, 0, 0, 0, 0);

function updateTime() {
    d.setMilliseconds(d.getMilliseconds() + 1000)
    timeLabel.text = qsTr(d.toTimeString());
}

function startTimer() {
    time.timer.running = true;
}

function stopTimer() {
    time.timer.running = false;
}

function resetTimer() {
    d = new Date(0, 0, 0, 0, 0, 0, 0);
}

