// File: pdf-viewer.js

document.addEventListener('DOMContentLoaded', () => {
    const pdfContainer = document.getElementById('pdfContainer');
    const pdfTitle = document.getElementById('pdfTitle');
    
    const urlParams = new URLSearchParams(window.location.search);
    const grade = urlParams.get('grade');
    const subject = urlParams.get('subject');

    if (grade && subject) {
        const gradeForFile = grade.toLowerCase().replace(' ', '');
        const pdfUrl = `pdfs/${gradeForFile}_${subject.toLowerCase().replace(' ', '_')}.pdf`;
        pdfTitle.textContent = `${grade.toUpperCase()} ${subject}`;

        caches.match(pdfUrl).then(response => {
            if (response) {
                const pdfEmbed = document.createElement('embed');
                pdfEmbed.src = pdfUrl;
                pdfEmbed.type = 'application/pdf';
                pdfEmbed.width = '100%';
                pdfEmbed.height = '600px';
                pdfContainer.appendChild(pdfEmbed);
            } else {
                if (navigator.onLine) {
                    const pdfEmbed = document.createElement('embed');
                    pdfEmbed.src = pdfUrl;
                    pdfEmbed.type = 'application/pdf';
                    pdfEmbed.width = '100%';
                    pdfEmbed.height = '600px';
                    pdfContainer.appendChild(pdfEmbed);
                } else {
                    pdfContainer.innerHTML = '<p>This PDF is not available offline. Please connect to the internet to view it.</p>';
                }
            }
        });
    } else {
        pdfTitle.textContent = 'PDF not found';
        pdfContainer.textContent = 'The requested PDF could not be loaded.';
    }
});