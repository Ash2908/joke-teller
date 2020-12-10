const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke from Joke API to VoiceRSS API
function tellAJoke(joke) {
    VoiceRSS.speech({
        key: '05ddc04a5d314214a8fb087be2f7ae02',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Pun?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellAJoke(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        console.log("Sorry", error)
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);