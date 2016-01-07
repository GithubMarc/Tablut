function updateScore() {
    mainForm.playPage.score.scoreLabel.text = ++mainForm.playPage.field.scoring;
}

function resetScore() {
    mainForm.playPage.field.scoring = 0;
}
