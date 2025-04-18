const vocabularies = {
    spanish: [
        { word: "Hola", translation: "Hello" },
        { word: "Adiós", translation: "Goodbye" },
        { word: "Por favor", translation: "Please" },
        { word: "Gracias", translation: "Thank you" },
        { word: "Sí", translation: "Yes" },
        { word: "No", translation: "No" },
        { word: "Disculpe", translation: "Excuse me" },
        { word: "Bueno", translation: "Good" },
        { word: "Malo", translation: "Bad" },
        { word: "Amor", translation: "Love" }
    ],
    french: [
        { word: "Bonjour", translation: "Hello" },
        { word: "Au revoir", translation: "Goodbye" },
        { word: "S'il vous plaît", translation: "Please" },
        { word: "Merci", translation: "Thank you" },
        { word: "Oui", translation: "Yes" },
        { word: "Non", translation: "No" },
        { word: "Excusez-moi", translation: "Excuse me" },
        { word: "Bon", translation: "Good" },
        { word: "Mauvais", translation: "Bad" },
        { word: "Amour", translation: "Love" }
    ],
    german: [
        { word: "Hallo", translation: "Hello" },
        { word: "Auf Wiedersehen", translation: "Goodbye" },
        { word: "Bitte", translation: "Please" },
        { word: "Danke", translation: "Thank you" },
        { word: "Ja", translation: "Yes" },
        { word: "Nein", translation: "No" },
        { word: "Entschuldigung", translation: "Excuse me" },
        { word: "Gut", translation: "Good" },
        { word: "Schlecht", translation: "Bad" },
        { word: "Liebe", translation: "Love" }
    ],
    italian: [
        { word: "Ciao", translation: "Hello" },
        { word: "Arrivederci", translation: "Goodbye" },
        { word: "Per favore", translation: "Please" },
        { word: "Grazie", translation: "Thank you" },
        { word: "Sì", translation: "Yes" },
        { word: "No", translation: "No" },
        { word: "Scusi", translation: "Excuse me" },
        { word: "Buono", translation: "Good" },
        { word: "Cattivo", translation: "Bad" },
        { word: "Amore", translation: "Love" }
    ]
};

let currentLanguage = "spanish";
let vocabulary = vocabularies[currentLanguage];
let currentIndex = -1;
let wordsLearned = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let testMode = false;

const wordEl = document.getElementById("word");
const translationEl = document.getElementById("translation");
const progressBarEl = document.getElementById("progress-bar");
const statsEl = document.getElementById("stats");
const scoreboardEl = document.getElementById("scoreboard");
const testSection = document.getElementById("test-section");
const feedbackEl = document.getElementById("feedback");
const answerInput = document.getElementById("answerInput");

function changeLanguage() {
    currentLanguage = document.getElementById("language").value;
    vocabulary = vocabularies[currentLanguage];
    resetLearning();
    updateStats();
}

function resetLearning() {
    currentIndex = -1;
    wordsLearned = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    wordEl.textContent = "Click Next to Start";
    translationEl.textContent = "";
    translationEl.style.display = "none";
    feedbackEl.textContent = "";
    answerInput.value = "";
    updateProgressBar();
    updateScoreboard();
}

function toggleTranslation() {
    if (currentIndex >= 0 && !testMode) {
        translationEl.style.display = translationEl.style.display === "none" ? "block" : "none";
    }
}

function nextWord() {
    if (translationEl.style.display === "block") {
        wordsLearned++;
    }

    currentIndex = (currentIndex + 1) % vocabulary.length;
    const current = vocabulary[currentIndex];

    wordEl.textContent = current.word;
    translationEl.textContent = current.translation;
    translationEl.style.display = "none";
    answerInput.value = "";
    feedbackEl.textContent = "";

    updateProgressBar();
    updateStats();
}

function updateProgressBar() {
    const progress = ((currentIndex + 1) / vocabulary.length) * 100;
    progressBarEl.style.width = `${progress}%`;
}

function updateStats() {
    statsEl.textContent = `Words learned: ${wordsLearned}/${vocabulary.length}`;
}

function toggleTestMode() {
    testMode = !testMode;
    testSection.style.display = testMode ? "block" : "none";
    translationEl.style.display = "none";
}

function submitAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = vocabulary[currentIndex].translation.toLowerCase();

    if (userAnswer === correctAnswer) {
        feedbackEl.textContent = "✅ Correct!";
        correctAnswers++;
    } else {
        feedbackEl.textContent = `❌ Incorrect. Correct answer: ${correctAnswer}`;
        wrongAnswers++;
    }

    updateScoreboard();
}

function updateScoreboard() {
    scoreboardEl.textContent = `Score: ${correctAnswers} correct, ${wrongAnswers} incorrect`;
}

// Initialize
updateStats();
updateScoreboard();
