const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const openTabs = {};
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';  // Replace with your actual API key

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Faizan ...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing Robert..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

function openNewTab(url, name, message) {
    const newTab = window.open(url, "_blank");
    openTabs[name] = newTab;
    speak(message);
}

function closeTab(name) {
    if (openTabs[name]) {
        openTabs[name].close();
        delete openTabs[name];
        speak(`Closing ${name}.`);
    } else {
        speak(`${name} is not open.`);
    }
}
function playSongOnYouTube(song) {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`;
    openNewTab(url, "YouTube Song Search", `Playing ${song} on YouTube.`);
}

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const temp = data.main.temp;
                const weather = data.weather[0].description;
                const finalText = `The weather in ${city} is ${weather} with a temperature of ${temp} degrees Celsius.`;
                speak(finalText);
            } else {
                throw new Error("API request failed");
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            speak("I couldn't find the weather for that location. Searching on Google instead.");
            openNewTab(`https://www.google.com/search?q=weather+in+${city}`, "Weather Search", `This is what I found on Google regarding the weather in ${city}.`);
        });
}

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("who developed you")) {
        openNewTab("https://www.google.com/search?q=faizan+tareen", "developer", "Faizan Tareen is my developer...");
    } else if (message.includes('what is your name')) {
        speak("My Name is Robert...");
    } else if (message.includes('thank you') || message.includes('thanks')) {
        speak("You're welcome sir ...");
    } else if (message.includes('how are you')|| message.includes('how r u')) {
        speak("I'm fine sir, thanks....");
    } else if (message.includes('good morning')) {
        speak("Good morning sir, I hope this day is as special as you are...");
    } else if (message.includes('who are you') || message.includes('hu r u')) {
        speak("I am Robert, a virtual assistant of Faizan Tareen...");
    }
    else if (message.includes('good afternoon') || message.includes('afternoon')) {
        speak("Good afternoon! How's your day going?");
    } else if (message.includes('good evening') || message.includes('evening')) {
        speak("Good evening! How was your day?");
    } else if (message.includes('good night') || message.includes('night')) {
        speak("Good night! Have sweet dreams.");
    } 
      else if (message.includes('do you like music') || message.includes('are you a music fan')) {
        speak("I don’t have personal preferences, but I can help you find music!");
    } else if (message.includes('can you tell a joke') || message.includes('tell me a joke')) {
        speak("Why don't scientists trust atoms? Because they make up everything!");
   }
    else if (message.includes("open google")) {
        openNewTab("https://google.com", "Google", "Opening Google...");
    } else if (message.includes("close google")) {
        closeTab("Google");
    } else if (message.includes("open youtube")) {
        openNewTab("https://youtube.com", "YouTube", "Opening YouTube...");
    }
      else if (message.includes("play youtube shorts")) {
        openNewTab("https://www.youtube.com/shorts/tHoYUfX9so8", "shorts", "playing youtube shorts...");
    }
    else if (message.includes("close youtube")) {
        closeTab("YouTube");
    } else if (message.includes("open insta")) {
        openNewTab("https://instagram.com/", "Instagram", "Opening Instagram...");
    } else if (message.includes("close insta")) {
        closeTab("Instagram");
    } else if (message.includes("open tiktok")) {
        openNewTab("https://tiktok.com/en/", "TikTok", "Opening TikTok...");
    } else if (message.includes("close tiktok")) {
        closeTab("TikTok");
    } else if (message.includes("open chat gpt")) {
        openNewTab("https://chatgpt.com/", "ChatGPT", "Opening ChatGPT...");
    } else if (message.includes("close chat gpt")) {
        closeTab("ChatGPT");
    } else if (message.includes("play zeeshan rokhri song")) {
      openNewTab("https://www.youtube.com/watch?v=7bGbSFEmo1I", "song", "playing  your song...");
    }
    else if (message.includes("play my favourite song")) {
    openNewTab("https://www.youtube.com/watch?v=OL1AkIavBqw", "song", "playing  your favourite song...");
    }
    else if (message.includes("open gmail") || message.includes('mail')) {
        openNewTab("https://mail.google.com/", "Gmail", "Opening Gmail...");
    } else if (message.includes("close gmail") || message.includes('close mail')) {
        closeTab("Gmail");
    } else if (message.includes("open facebook")) {
        openNewTab("https://facebook.com", "Facebook", "Opening Facebook...");
    } else if (message.includes("close facebook")) {
        closeTab("Facebook");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        openNewTab(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "Search", "This is what I found on the internet regarding " + message);
    } else if (message.includes('search in youtube') || message.includes('type in youtube')) {
        openNewTab(`https://www.youtube.com/search?q=${message.replace("type in youtube", "").trim().replace(" ", "+")}`, "YouTube Search", "This is your search on YouTube.");
    }
    else if (message.includes('type in chat gpt')) {
        openNewTab(`https://chat.openai.com/chat?q=${message.replace("type in chat gpt", "").trim().replace(" ", "+")}`, " chat gpt Search", " i type in chat gpt.");
    }

    else if (message.includes('wikipedia')) {
        openNewTab(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim().replace(" ", "_")}`, "Wikipedia", "This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak(date);
    } else if (message.includes('calculator')) {
        openNewTab('Calculator:///', "Calculator", "Opening Calculator");
    } else if (message.includes('close all tabs')) {
        closeAllTabs();
    } else if (message.includes('weather in')) {
        const city = message.split('weather in')[1].trim();
        if (city) {
            getWeather(city);
        } else {
            speak("Please specify a city to get the weather information.");
        }
    } else if (message.includes('open paint')) {
        openPaint();
    } else {
        openNewTab(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "Search", "I found some information for " + message + " on Google");
    }
}

function closeAllTabs() {
    for (let name in openTabs) {
        if (openTabs[name] && !openTabs[name].closed) {
            openTabs[name].close();
        }
    }
    speak("All tabs are now closed.");
    openTabs.length = 0;
}

function openPaint() {
    try {
        window.location.href = 'ms-paint:';
        speak("Opening Paint...");
    } catch (error) {
        speak("Unable to open Paint directly from the browser. Please open it manually.");
    }
}
