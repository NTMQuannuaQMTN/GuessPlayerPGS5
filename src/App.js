import './index.css';
import players from "./Data.json";

function App() {
  let guesses = 0;
  let randomIndex = Math.floor(Math.random() * players.length);
  let randomPlayer = players[randomIndex];
  const playerNames = players.map(player => player.name.toLowerCase());
  const sortNames = players.map(player => player.name.toLowerCase());
  sortNames.sort();

  function startGame() {
    let imgGame = document.getElementById("playerImg");
    imgGame.src = "/img/game/guess.svg";
    document.getElementById("player-answer").placeholder = "GUESS NUMBER 1 OF 6";
    document.getElementById("player-answer").disabled = false;
    guesses = 0;
    let cont = document.getElementById("guesses");
    cont.innerHTML = "<div class=\"titles\">\
          <h2>PGS KILLS</h2>\
          <h2>Nation</h2>\
          <h2>Team</h2>\
          <h2>Region</h2>\
          <h2>Player</h2>\
        </div>";
    randomIndex = Math.floor(Math.random() * players.length);
    randomPlayer = players[randomIndex];
    document.getElementById("complete").innerHTML = `IT IS ${randomPlayer.name.toUpperCase()}`;
  }

  function checkPlayer() {
    let imgGame = document.getElementById("playerImg");
    let cont = document.getElementById("guesses");
    let playerInput = document.getElementById("player-answer").value;
    if (!playerNames.includes(playerInput.toLowerCase())) {
      let inv = document.getElementById("invalid");
      inv.style.height = "fit-content";
      inv.style.opacity = 1;
      setTimeout(function () { inv.style.opacity = 0; inv.style.height = "0"; }, 1000);
    } else {
      guesses++;
      let attDiv = document.createElement("div");
      attDiv.className = "att";
      let checkKills = document.createElement("div");
      if (players[playerNames.indexOf(playerInput.toLowerCase())].kills < randomPlayer.kills) {
        checkKills.innerHTML = `${players[playerNames.indexOf(playerInput.toLowerCase())].kills}<img src="/img/game/up.svg"></img>`;
      } else if (players[playerNames.indexOf(playerInput.toLowerCase())].kills > randomPlayer.kills) {
        checkKills.innerHTML = `${players[playerNames.indexOf(playerInput.toLowerCase())].kills}<img src="/img/game/down.svg"></img>`;
      } else {
        checkKills.innerHTML = `${players[playerNames.indexOf(playerInput.toLowerCase())].kills}`;
      }
      checkKills.className = "checkKills";
      let checkNation = document.createElement("div");
      checkNation.className = "checkNation";
      let imgNat = `/img/nations/${players[playerNames.indexOf(playerInput.toLowerCase())].nation}.webp`
      checkNation.innerHTML = `<img src="${imgNat}"></img>`;
      let checkTeam = document.createElement("div");
      checkTeam.className = "checkTeam";
      let imgTeam = `/img/teams/${players[playerNames.indexOf(playerInput.toLowerCase())].team}.png`
      checkTeam.innerHTML = `<img src="${imgTeam}"></img>`;
      let checkRegion = document.createElement("div");
      checkRegion.className = "checkRegion";
      checkRegion.innerHTML = players[playerNames.indexOf(playerInput.toLowerCase())].region;
      let checkPlayer = document.createElement("div");
      checkPlayer.className = "checkPlayer";
      let imgPl = `/img/players/${players[playerNames.indexOf(playerInput.toLowerCase())].name}.png`
      checkPlayer.innerHTML = `<img src="${imgPl}"></img>`;
      attDiv.appendChild(checkKills);
      attDiv.appendChild(checkNation);
      attDiv.appendChild(checkTeam);
      attDiv.appendChild(checkRegion);
      attDiv.appendChild(checkPlayer);
      cont.insertBefore(attDiv, cont.childNodes[1]);
      if (players[playerNames.indexOf(playerInput.toLowerCase())].kills === randomPlayer.kills) {
        checkKills.classList.add("correct");
      }
      if (players[playerNames.indexOf(playerInput.toLowerCase())].nation === randomPlayer.nation) {
        checkNation.classList.add("correct");
      }
      if (players[playerNames.indexOf(playerInput.toLowerCase())].team === randomPlayer.team) {
        checkTeam.classList.add("correct");
      }
      if (players[playerNames.indexOf(playerInput.toLowerCase())].region === randomPlayer.region) {
        checkRegion.classList.add("correct");
      }
      if (players[playerNames.indexOf(playerInput.toLowerCase())].region === "Americas") {
        if (window.innerWidth > 768) {
          checkRegion.style.fontSize = "18px";
        } else {
          checkRegion.style.fontSize = "12px";
        }
      }
      if (players[playerNames.indexOf(playerInput.toLowerCase())].name === randomPlayer.name) {
        checkPlayer.classList.add("correct");
      }
      if (playerInput.toLowerCase() === randomPlayer.name.toLowerCase()) {
        let done = document.getElementById("complete");
        setTimeout(function () {
          done.style.opacity = 1; done.style.height = "fit-content";
          imgGame.src = `/img/players/${randomPlayer.name.toLowerCase().replace(/\s+/g, '')}.png`;
        }, 2500)
        setTimeout(function () { done.style.opacity = 0; done.style.height = "0"; }, 4000);
        setTimeout(startGame, 5000);
      }
      document.getElementById("player-answer").value = "";
      if (playerInput.toLowerCase() !== randomPlayer.name.toLowerCase()) {
        document.getElementById("player-answer").placeholder = `GUESS NUMBER ${guesses + 1} OF 6`;
      } else {
        document.getElementById("player-answer").placeholder = "WELL DONE";
        document.getElementById("player-answer").disabled = true;
      }
    }

    if (guesses == 6 && playerInput.toLowerCase() !== randomPlayer.name.toLowerCase()) {
      document.getElementById("player-answer").placeholder = "YOU LOSE";
      document.getElementById("player-answer").disabled = true;
      let done = document.getElementById("complete");
      setTimeout(function () {
        done.style.opacity = 1; done.style.height = "fit-content";
        imgGame.src = `/img/players/${randomPlayer.name.toLowerCase().replace(/\s+/g, '')}.png`
      }, 2500)
      setTimeout(function () {
        done.style.opacity = 0; done.style.height = "0";
        imgGame.src = `/img/players/${randomPlayer.name.toLowerCase().replace(/\s+/g, '')}.png`;
      }, 4000);
      setTimeout(startGame, 5000);
    }
  }

  function handleInputChange() {
    let input = document.getElementById("player-answer").value.toLowerCase();
    let suggestions = sortNames.filter(name => name.startsWith(input));
    if (input.length > 1) {
      showAutocompleteSuggestions(suggestions);
    } else {
      let suggestionBox = document.getElementById("autocomplete-list");
      suggestionBox.innerHTML = "";
    }
  }

  function showAutocompleteSuggestions(suggestions) {
    let suggestionBox = document.getElementById("autocomplete-list");
    suggestionBox.innerHTML = "";
    suggestions.forEach(suggestion => {
      let option = document.createElement("div");
      option.classList.add("autocomplete-item");
      let sugSrc = `/img/teams/${players[playerNames.indexOf(suggestion.toLowerCase())].team}.png`
      option.innerHTML = `<img src="${sugSrc}">
      </img><h1><span>${players[playerNames.indexOf(suggestion.toLowerCase())].name
        .substring(0, document.getElementById("player-answer").value.length)}</span>${players[playerNames
          .indexOf(suggestion.toLowerCase())].name.substring(document.getElementById("player-answer").value.length)}</h1>`;
      option.onclick = function () {
        document.getElementById("player-answer").value = suggestion;
        suggestionBox.innerHTML = "";
        checkPlayer();
      };
      suggestionBox.appendChild(option);
    });
  }

  return (
    <div className="App">
      <div id="invalid">NO PLAYER WITH THAT NAME</div>
      <div id="complete">IT IS {randomPlayer.name.toUpperCase()}</div>
      <div className="header">
        <h1>GUESS THE PUBG PLAYER (PGS5 EDITION)</h1>
      </div>
      <div className="start" onClick={startGame}>
        <h2>START GAME</h2>
      </div>
      <div className="player-guess">
        <img id="playerImg" src={"/img/game/guess.svg"}></img>
        <input autoComplete="off" id="player-answer" type="text" placeholder={`GUESS NUMBER 1 OF 6`}
          onInput={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              checkPlayer();
              let suggestionBox = document.getElementById("autocomplete-list");
              suggestionBox.innerHTML = "";
            }
          }}></input>
        <div id="autocomplete-list" className="autocomplete-items"></div>
      </div>
      <div id="guesses">
        <div className="titles">
          <h2>PGS KILLS</h2>
          <h2>Nation</h2>
          <h2>Team</h2>
          <h2>Region</h2>
          <h2>Player</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
