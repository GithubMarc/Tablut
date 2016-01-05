function updateScore() {
    //.scoreLabel.text = ++playerScore;
    score.scoreLabel.text = ++field.scoring;
}

function resetScore() {
    field.scoring = 0;
}
