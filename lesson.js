document.addEventListener('DOMContentLoaded', () => {
    const coursesBySubject = {
        science: {
            3: ["Introduction to Biology", "Basic Chemistry", "Earth Science"],
            4: ["Human Body Systems", "Matter and Energy", "Weather and Climate"],
            5: ["Ecosystems", "Forces and Motion", "Space Science"],
            6: ["Cells and Genetics", "Chemical Reactions", "Plate Tectonics"],
        },
        math: {
            3: ["Multiplication and Division", "Fractions", "Geometry Basics"],
            4: ["Multi-digit Arithmetic", "Decimals", "Data and Graphs"],
            5: ["Order of Operations", "Algebraic Thinking", "Volume and Area"],
            6: ["Ratios and Proportions", "Integers", "Statistical Thinking"],
        },
        religiousStudies: {
            3: ["World Religions Overview", "Why Islam", "Prophets"],
            4: ["Prophet Mohammed", "Sahaba Stories", "How to pray"],
            5: ["Islamic wars", "Masjids", "Hadiths"],
            6: ["History Of Islam", "How to be like The Prophet", "The Greatness of Islam"],
        },
    };

    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const grade = urlParams.get('grade');
    const lessonIndex = parseInt(urlParams.get('lesson'));

    const lessonTitle = document.getElementById('lessonTitle');
    const lessonInfo = document.getElementById('lessonInfo');
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');

    if (subject && grade && lessonIndex !== undefined) {
        const lesson = coursesBySubject[subject][grade][lessonIndex];
        lessonTitle.textContent = lesson;
        const gradeDisplay = typeof grade === 'string' ? grade.toUpperCase() : `Grade ${grade}`;
        lessonInfo.textContent = `${subject.charAt(0).toUpperCase() + subject.slice(1)} - ${gradeDisplay}`;

        let currentSlide = 0;
        const totalSlides = 10;

        prevSlide.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlide();
            }
        });

        nextSlide.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlide();
            }
        });

        function updateSlide() {
            const presentationContainer = document.getElementById('presentationPlaceholder');
            presentationContainer.innerHTML = `
                <embed 
                    src="/presentations/${subject}-${grade}-lesson${lessonIndex}.pdf#page=${currentSlide + 1}" 
                    type="application/pdf"
                    width="100%"
                    height="600px"
                />
            `;
        }

        updateSlide();
    } else {
        lessonTitle.textContent = 'Lesson not found';
        lessonInfo.textContent = 'Invalid lesson parameters';
        prevSlide.style.display = 'none';
        nextSlide.style.display = 'none';
    }
});

