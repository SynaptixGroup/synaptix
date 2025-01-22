document.addEventListener('DOMContentLoaded', () => {
    const coursesBySubject = {
        science: {
            'kg1': ["Nature Around Us", "My Body", "Animals and Plants"],
            'kg2': ["Weather and Seasons", "Living Things", "Simple Machines"],
            1: ["Exploring Nature", "My Five Senses", "Day and Night"],
            2: ["Life Cycles", "Materials", "Space and Earth"],
            3: ["Introduction to Biology", "Basic Chemistry", "Earth Science"],
            4: ["Human Body Systems", "Matter and Energy", "Weather and Climate"],
            5: ["Ecosystems", "Forces and Motion", "Space Science"],
            6: ["Cells and Genetics", "Chemical Reactions", "Plate Tectonics"],
        },
        math: {
            'kg1': ["Numbers 1-10", "Shapes", "Basic Counting"],
            'kg2': ["Numbers 1-20", "Patterns", "Simple Addition"],
            1: ["Addition to 100", "Subtraction", "Basic Shapes"],
            2: ["Place Value", "Time", "Money"],
            3: ["Multiplication and Division", "Fractions", "Geometry Basics"],
            4: ["Multi-digit Arithmetic", "Decimals", "Data and Graphs"],
            5: ["Order of Operations", "Algebraic Thinking", "Volume and Area"],
            6: ["Ratios and Proportions", "Integers", "Statistical Thinking"],
        },
        religiousStudies: {
            'kg1': ["Simple Duas", "Islamic Manners", "Allah's Creation"],
            'kg2': ["Basic Islamic Values", "Short Surahs", "Prophet Stories"],
            1: ["Five Pillars", "Islamic Greetings", "Good Behavior"],
            2: ["Prayer Basics", "Quran Stories", "Islamic Months"],
            3: ["World Religions Overview", "Why Islam", "Prophets"],
            4: ["Prophet Mohammed", "Sahaba Stories", "How to pray"],
            5: ["Islamic wars", "Masjids", "Hadiths"],
            6: ["History Of Islam", "How to be like The Prophet", "The Greatness of Islam"],
        }
    };

    const courseIcons = {
        science: {
            "Introduction to Biology": "fa-dna",
            "Basic Chemistry": "fa-flask",
            "Earth Science": "fa-earth-americas",
            "Human Body Systems": "fa-heart",
            "Matter and Energy": "fa-atom",
            "Weather and Climate": "fa-cloud-sun",
            "Ecosystems": "fa-tree",
            "Forces and Motion": "fa-arrows-up-down-left-right",
            "Space Science": "fa-rocket",
            "Cells and Genetics": "fa-microscope",
            "Chemical Reactions": "fa-vial",
            "Plate Tectonics": "fa-mountain",
            "Nature Around Us": "fa-leaf",
            "My Body": "fa-child",
            "Animals and Plants": "fa-paw",
            "Weather and Seasons": "fa-cloud-sun",
            "Living Things": "fa-seedling",
            "Simple Machines": "fa-cogs",
            "Exploring Nature": "fa-mountain",
            "My Five Senses": "fa-eye",
            "Day and Night": "fa-moon",
            "Life Cycles": "fa-circle-notch",
            "Materials": "fa-cube",
            "Space and Earth": "fa-globe",
        },
        math: {
            "Multiplication and Division": "fa-divide",
            "Fractions": "fa-percent",
            "Geometry Basics": "fa-shapes",
            "Multi-digit Arithmetic": "fa-calculator",
            "Decimals": "fa-subscript",
            "Data and Graphs": "fa-chart-line",
            "Order of Operations": "fa-superscript",
            "Algebraic Thinking": "fa-function",
            "Volume and Area": "fa-cube",
            "Ratios and Proportions": "fa-equals",
            "Integers": "fa-plus-minus",
            "Statistical Thinking": "fa-chart-column",
            "Numbers 1-10": "fa-1",
            "Shapes": "fa-shapes",
            "Basic Counting": "fa-list-ol",
            "Numbers 1-20": "fa-2",
            "Patterns": "fa-border-all",
            "Simple Addition": "fa-plus",
            "Addition to 100": "fa-plus-circle",
            "Subtraction": "fa-minus",
            "Basic Shapes": "fa-square",
            "Place Value": "fa-sort-numeric-up",
            "Time": "fa-clock",
            "Money": "fa-dollar-sign",
        },
        religiousStudies: {
            "World Religions Overview": "fa-peace",
            "Why Islam": "fa-star-and-crescent",
            "Prophets": "fa-person-praying",
            "Prophet Mohammed": "fa-kaaba",
            "Sahaba Stories": "fa-book",
            "How to pray": "fa-hands",
            "Islamic wars": "fa-horse",
            "Masjids": "fa-mosque",
            "Hadiths": "fa-book-open",
            "History Of Islam": "fa-timeline",
            "How to be like The Prophet": "fa-heart",
            "The Greatness of Islam": "fa-star",
            "Simple Duas": "fa-hands",
            "Islamic Manners": "fa-heart",
            "Allah's Creation": "fa-star",
            "Basic Islamic Values": "fa-book",
            "Short Surahs": "fa-quran",
            "Prophet Stories": "fa-history",
            "Five Pillars": "fa-mosque",
            "Islamic Greetings": "fa-handshake",
            "Good Behavior": "fa-smile",
            "Prayer Basics": "fa-pray",
            "Quran Stories": "fa-book-open",
            "Islamic Months": "fa-calendar",
        }
    };

    const gradeButtons = document.getElementById('gradeButtons');
    const subjectButtons = document.getElementById('subjectButtons');
    const unitsList = document.getElementById('unitsList');

    const grades = ['kg1', 'kg2', 1, 2, 3, 4, 5, 6];
    const subjects = ['math', 'science', 'religiousStudies'];

    // Generate grade buttons
    grades.forEach(grade => {
        const button = document.createElement('button');
        button.className = 'grade-button';
        button.textContent = typeof grade === 'string' ? grade.toUpperCase() : `Grade ${grade}`;
        button.addEventListener('click', () => showSubjects(grade));
        gradeButtons.appendChild(button);
    });

    function showSubjects(grade) {
        subjectButtons.innerHTML = '';
        subjectButtons.style.display = 'flex';
        unitsList.style.display = 'none';

        subjects.forEach(subject => {
            const button = document.createElement('button');
            button.className = 'subject-button';
            button.textContent = subject.charAt(0).toUpperCase() + subject.slice(1).replace(/([A-Z])/g, ' $1').trim();
            button.addEventListener('click', () => showUnits(grade, subject));
            subjectButtons.appendChild(button);
        });
    }

    function showUnits(grade, subject) {
        unitsList.innerHTML = '';
        unitsList.style.display = 'block';

        const units = coursesBySubject[subject][grade];
        const subjectTitle = subject.charAt(0).toUpperCase() + subject.slice(1).replace(/([A-Z])/g, ' $1').trim();
        const gradeTitle = typeof grade === 'string' ? grade.toUpperCase() : `Grade ${grade}`;

        const title = document.createElement('h3');
        title.textContent = `${subjectTitle} - ${gradeTitle}`;
        unitsList.appendChild(title);

        const list = document.createElement('ul');
        units.forEach((unit, index) => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `lesson.html?subject=${subject}&grade=${grade}&lesson=${index}`;
            link.textContent = unit;
            listItem.appendChild(link);
            list.appendChild(listItem);
        });
        unitsList.appendChild(list);
    }
});

