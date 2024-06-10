const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result= document.getElementById("result");
const sound = document.getElementById("sound");
const btn= document.getElementById("search-btn");

/*btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord} `).then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML= ` <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
    });
});
function playSound(){
    sound.play();
}*/


btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value.trim();
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.title) {
                result.innerHTML = `<p class="error">Word not found. Please try again.</p>`;
                return;
            }
            let meaning = data[0].meanings[0];
            let definition = meaning.definitions[0];
            let phonetics = data[0].phonetics.find(p => p.audio);

            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    ${phonetics ? `<button onclick="playSound()">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>` : ""}
                </div>
                <div class="details">
                    <p>${meaning.partOfSpeech}</p>
                    <p>${data[0].phonetic ? `/${data[0].phonetic}/` : ""}</p>
                </div>
                <p class="word-meaning">
                    ${definition.definition}
                </p>
                <p class="word-example">
                    ${definition.example || ""}
                </p>`;

            if (phonetics) {
                sound.setAttribute("src", phonetics.audio);
            } else {
                sound.removeAttribute("src");
            }
        })
        .catch((error) => {
            console.error("Error fetching the data: ", error);
            result.innerHTML = `<p class="error">An error occurred. Please try again.</p>`;
        });
});

function playSound() {
    if (sound.getAttribute("src")) {
        sound.play();
    } else {
        console.error("No audio source available to play.");
    }
}