let choices = [];
const choiceInput = document.getElementById('choice-input');
const addChoiceBtn = document.getElementById('add-choice');
const choicesList = document.getElementById('choices-list');
const decideBtn = document.getElementById('decide-button');
const errorMessage = document.getElementById('error-message');
const wheelPage = document.getElementById('wheel-page');
const wheel = document.getElementById('wheel');
const wheelResult = document.getElementById('wheel-result');
const backBtn = document.createElement('button'); // Create a back button

addChoiceBtn.addEventListener('click', function() {
    const choice = choiceInput.value;
    if (choice) {
        choices.push(choice);
        const listItem = document.createElement('li');
        listItem.innerHTML = `${choice} <button onclick="removeChoice('${choice}')">Remove</button>`;
        choicesList.appendChild(listItem);
        choiceInput.value = '';

        // Check if there are at least 2 choices
        if (choices.length >= 2) {
            decideBtn.disabled = false;
            errorMessage.style.display = 'none';
        }
    }
});

function removeChoice(choice) {
    const index = choices.indexOf(choice);
    if (index !== -1) {
        choices.splice(index, 1);
    }

    // If less than 2 choices, disable the decide button
    if (choices.length < 2) {
        decideBtn.disabled = true;
    }

    // Refresh the list
    choicesList.innerHTML = '';
    choices.forEach(choice => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${choice} <button onclick="removeChoice('${choice}')">Remove</button>`;
        choicesList.appendChild(listItem);
    });
}

choiceInput.addEventListener('keydown', function(e) {
    if (e.keyCode === 13 && choiceInput.value.trim() !== '') {
        addChoiceBtn.click();
    }
});

decideBtn.addEventListener('click', function() {
    if (choices.length > 0) {
        document.querySelector('.container').style.display = 'none';
        wheelPage.classList.add('showing');
        wheelPage.style.display = 'block';

        const angle = 360 / choices.length;
        wheel.innerHTML = '';  // Clear existing segments

        for (let i = 0; i < choices.length; i++) {
            const segment = document.createElement('div');
            segment.className = 'segment';
            const color = `hsl(${(i * (360 / choices.length))}, 70%, 60%)`; 
            segment.style.backgroundColor = color;
            segment.style.transform = `rotate(${i * angle}deg) skewY(${angle - 90}deg)`;
            wheel.appendChild(segment);
        }

        let spins = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
        wheel.style.animation = `spin ${spins}s linear`;

        setTimeout(() => {
            const selected = choices[Math.floor(Math.random() * choices.length)];
            wheelResult.textContent = `You should choose: ${selected}`;
            wheel.style.animation = '';  // Reset animation
        }, spins * 1000);
    } else {
        errorMessage.style.display = 'block';
    }
});

backBtn.textContent = 'Go Back';
backBtn.id = 'backBtn';
wheelPage.appendChild(backBtn);

backBtn.addEventListener('click', function() {
    wheelPage.style.display = 'none';
    document.querySelector('.container').style.display = 'block';
});
