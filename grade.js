// File: grade.js

document.addEventListener('DOMContentLoaded', () => {
    const subjectButtons = document.getElementById('subjectButtons');
    const gradeTitle = document.getElementById('gradeTitle');
    const subjects = ['Math', 'Science', 'Religious Studies'];
    
    const urlParams = new URLSearchParams(window.location.search);
    let grade = urlParams.get('grade');

    if (grade) {
        grade = grade.replace('_', ' ');
        gradeTitle.textContent = `${grade.toUpperCase()} Subjects`;

        subjects.forEach(subject => {
            const button = document.createElement('button');
            button.className = 'subject-button';
            button.textContent = subject;
            button.addEventListener('click', () => {
                const pdfUrl = `pdfs/${grade.toLowerCase().replace(' ', '')}_${subject.toLowerCase().replace(' ', '_')}.pdf`;
                
                // Check if the PDF is in the cache before navigating
                caches.match(pdfUrl).then(response => {
                    if (response) {
                        window.location.href = `pdf-viewer.html?grade=${encodeURIComponent(grade)}&subject=${encodeURIComponent(subject)}`;
                    } else {
                        if (navigator.onLine) {
                            window.location.href = `pdf-viewer.html?grade=${encodeURIComponent(grade)}&subject=${encodeURIComponent(subject)}`;
                        } else {
                            alert('This PDF is not available offline. Please connect to the internet to view it.');
                        }
                    }
                });
            });
            subjectButtons.appendChild(button);
        });
    } else {
        gradeTitle.textContent = 'Grade not specified';
    }
});