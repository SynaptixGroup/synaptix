document.addEventListener('DOMContentLoaded', () => {
    const gradeSelect = document.getElementById('gradeSelect');
    const subjectSelect = document.getElementById('subjectSelect');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizSetup = document.getElementById('quizSetup');
    const quizContent = document.getElementById('quizContent');
    const questionText = document.getElementById('questionText');
    const answerOptions = document.getElementById('answerOptions');
    const submitAnswerBtn = document.getElementById('submitAnswerBtn');
    const explanation = document.getElementById('explanation');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const quizResults = document.getElementById('quizResults');
    const scoreElement = document.getElementById('score');

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    gradeSelect.addEventListener('change', updateStartButton);
    subjectSelect.addEventListener('change', updateStartButton);

    function updateStartButton() {
        startQuizBtn.disabled = !(gradeSelect.value && subjectSelect.value);
    }

    startQuizBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        const grade = gradeSelect.value;
        const subject = subjectSelect.value;
        currentQuestions = getQuestions(grade, subject);
        currentQuestionIndex = 0;
        score = 0;

        quizSetup.style.display = 'none';
        quizContent.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        const question = currentQuestions[currentQuestionIndex];
        questionText.textContent = question.text;
        answerOptions.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(index));
            answerOptions.appendChild(button);
        });

        submitAnswerBtn.style.display = 'inline-block';
        explanation.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
    }

    function selectAnswer(index) {
        const buttons = answerOptions.getElementsByTagName('button');
        for (let button of buttons) {
            button.classList.remove('selected');
        }
        buttons[index].classList.add('selected');
    }

    submitAnswerBtn.addEventListener('click', submitAnswer);

    function submitAnswer() {
        const selectedButton = answerOptions.querySelector('.selected');
        if (!selectedButton) return;

        const selectedIndex = Array.from(answerOptions.children).indexOf(selectedButton);
        const question = currentQuestions[currentQuestionIndex];

        if (selectedIndex === question.correctAnswer) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            answerOptions.children[question.correctAnswer].classList.add('correct');
        }

        explanation.textContent = question.explanation;
        explanation.style.display = 'block';
        submitAnswerBtn.style.display = 'none';
        nextQuestionBtn.style.display = 'inline-block';
    }

    nextQuestionBtn.addEventListener('click', nextQuestion);

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizContent.style.display = 'none';
        quizResults.style.display = 'block';
        scoreElement.textContent = `${score} out of ${currentQuestions.length}`;
    }

    function getQuestions(grade, subject) {
        // This function would typically fetch questions from an API
        // For now, we'll return some sample questions based on grade and subject
        return [
            {
                text: `${subject} question for grade ${grade}: What is 2 + 2?`,
                options: ["3", "4", "5", "6"],
                correctAnswer: 1,
                explanation: "2 + 2 = 4 is a basic addition fact."
            },
            {
                text: `${subject} question for grade ${grade}: What is the capital of France?`,
                options: ["London", "Berlin", "Paris", "Madrid"],
                correctAnswer: 2,
                explanation: "Paris is the capital and most populous city of France."
            },
            // Add more questions here...
        ];
    }
});

