document.addEventListener('DOMContentLoaded', () => {
    const gradeButtons = document.getElementById('gradeButtons');
    const grades = ['KG1', 'KG2', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

    grades.forEach(grade => {
        const button = document.createElement('button');
        button.className = 'grade-button';
        button.textContent = grade;
        button.addEventListener('click', () => {
            const gradeParam = grade.replace(' ', '_').toLowerCase();
            window.location.href = `grade.html?grade=${encodeURIComponent(gradeParam)}`;
        });
        gradeButtons.appendChild(button);
    });
});
