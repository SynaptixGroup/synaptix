const quizData = {
    'KG1': {
        'Math': [
            {
                question: "What comes after 3?",
                options: ["2", "4", "5", "6"],
                correctAnswer: 1,
                explanation: "4 comes after 3 in the counting sequence."
            },
            {
                question: "Which shape is round?",
                options: ["Square", "Triangle", "Circle", "Rectangle"],
                correctAnswer: 2,
                explanation: "A circle is round, while squares and triangles have edges."
            }
        ],
        'Science': [
            {
                question: "Which animal says 'moo'?",
                options: ["Dog", "Cat", "Cow", "Sheep"],
                correctAnswer: 2,
                explanation: "A cow makes the 'moo' sound, while dogs bark and cats meow."
            }
        ]
    },
    'Grade 1': {
        'Math': [
            {
                question: "What is 5 + 3?",
                options: ["7", "8", "9", "10"],
                correctAnswer: 1,
                explanation: "5 + 3 equals 8."
            }
        ],
        'Science': [
            {
                question: "Which of these is a plant?",
                options: ["Dog", "Car", "Tree", "Rock"],
                correctAnswer: 2,
                explanation: "A tree is a living plant, while the others are not."
            }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const gradeSelect = document.getElementById('gradeSelect');
    const subjectSelect = document.getElementById('subjectSelect');
    const quizContainer = document.getElementById('quizContainer');
    const quizTitle = document.getElementById('quizTitle');
    const questionContainer = document.getElementById('questionContainer');
    const submitQuizButton = document.getElementById('submitQuiz');
    const quizResults = document.getElementById('quizResults');

    // Populate Grade Dropdown
    Object.keys(quizData).forEach(grade => {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = grade;
        gradeSelect.appendChild(option);
    });

    // Handle Grade Selection
    gradeSelect.addEventListener('change', () => {
        subjectSelect.innerHTML = '<option value="">Select Subject</option>'; // Reset subjects
        if (gradeSelect.value) {
            Object.keys(quizData[gradeSelect.value]).forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
            subjectSelect.disabled = false;
        } else {
            subjectSelect.disabled = true;
        }
    });

    // Handle Subject Selection
    subjectSelect.addEventListener('change', () => {
        if (subjectSelect.value) {
            showQuiz(gradeSelect.value, subjectSelect.value);
        }
    });

    function showQuiz(grade, subject) {
        quizTitle.textContent = `${grade} ${subject} Quiz`;
        questionContainer.innerHTML = '';

        quizData[grade][subject].forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((option, i) => `
                    <label style="display: block;">
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
                <p class="explanation" style="display: none; font-style: italic; font-size: 0.9em;"></p>
            `;
            questionContainer.appendChild(questionDiv);
        });

        submitQuizButton.style.display = 'block';
        quizResults.style.display = 'none';
        quizContainer.style.display = 'block';
    }

    submitQuizButton.addEventListener('click', () => {
        const grade = gradeSelect.value;
        const subject = subjectSelect.value;
        if (!grade || !subject) {
            alert("Error: Please select a grade and subject before submitting.");
            return;
        }

        const questions = quizData[grade][subject];
        let score = 0;

        questions.forEach((q, index) => {
            const options = document.querySelectorAll(`input[name="q${index}"]`);
            let selectedAnswer = null;
            let explanationElement = document.querySelectorAll('.explanation')[index];

            options.forEach(option => {
                option.parentElement.style.color = ""; // Reset color
                if (option.checked) {
                    selectedAnswer = option;
                }
            });

            const correctOption = options[q.correctAnswer];

            if (selectedAnswer) {
                if (parseInt(selectedAnswer.value) === q.correctAnswer) {
                    selectedAnswer.parentElement.style.color = "green"; // ✅ Correct
                    score++;
                } else {
                    selectedAnswer.parentElement.style.color = "red"; // ❌ Wrong
                    correctOption.parentElement.style.color = "green";
                }
            } else {
                correctOption.parentElement.style.color = "green"; // Highlight correct answer
            }

            explanationElement.textContent = q.explanation;
            explanationElement.style.display = "block";
        });

        quizResults.textContent = `You scored ${score} out of ${questions.length}`;
        quizResults.style.display = 'block';
    });
});
