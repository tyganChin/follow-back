let count = 0;
let ogCount = 0;

document.addEventListener('DOMContentLoaded', displayNames);

function displayNames() {
    const noFollowBack = JSON.parse(localStorage.getItem('noFollowBack')) || {};

    
    count = ogCount =  Object.keys(noFollowBack).length;
    document.getElementById('output').innerHTML = ogCount + " accounts found, " + count + " accounts listed";

    const accountList = document.getElementById('result');

    const entries = Object.entries(noFollowBack);
    for (let i = 0; i < entries.length; i += 1) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('account-line');

        resultDiv.classList.add('account');
        const image = document.createElement('img');
        image.src = 'images/profile_pic.png'; // Replace with your image path
        image.alt = 'Description of the image';
        image.classList.add('account-image');

        const name = document.createElement('a');
        name.classList.add('account-name');
        name.href = entries[i][1];
        name.textContent = entries[i][0];
        name.target = '_blank';

        const closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.textContent = 'X';
        closeButton.onclick = () => {
            resultDiv.remove();
            --count;
            launchConfetti();
            final();
        };
    
        resultDiv.appendChild(image);
        resultDiv.appendChild(name);
        resultDiv.appendChild(closeButton);
        accountList.appendChild(resultDiv);
    }
}

function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 }
    });
}

function final() {
    const outputElement = document.getElementById('output');
    const parentElement = outputElement.parentElement; // Assuming the parent element is the flex container

    if (count != 0) {
        outputElement.innerHTML = ogCount + " accounts found, " + count + " accounts listed.";
    } else {
        // Set styles on the output element
        outputElement.style.fontSize = '300px'; // Set the font size
        outputElement.style.fontWeight = 'bold'; // Set the font weight
        outputElement.style.textAlign = 'center'; // Center-align the text

        outputElement.style.backgroundImage = "url('images/allCleanBackground.avif')";
        outputElement.style.backgroundSize = 'cover';
        outputElement.style.backgroundPosition = 'center';
        outputElement.style.webkitBackgroundClip = 'text';
        outputElement.style.backgroundClip = 'text';
        outputElement.style.webkitTextFillColor = 'transparent';
        outputElement.style.textFillColor = 'transparent';
        outputElement.style.webkitTextStroke = '2px black';

        // Ensure the parent element is a flex container and center its children vertically
        parentElement.style.display = 'flex';
        parentElement.style.justifyContent = 'center'; // Center horizontally
        parentElement.style.alignItems = 'center'; // Center vertically

        outputElement.innerHTML = "All Clean!";


        setInterval(endBurst, 1000);

    }
}

function endBurst() {
    // Launch confetti from different horizontal and vertical origins
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.1, y: 0.6 }
    });
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.6 }
    });
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.9, y: 0.6 }
    });
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.1, y: 0.0 }
    });
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.0 }
    });
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.9, y: 0.0 }
    });
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.1, y: 1.0 }
    });
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 1.0 }
    });
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.9, y: 1.0 }
    });
}


