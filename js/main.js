document.addEventListener("DOMContentLoaded", () => {
  // Lista de palavras possíveis (todas com 5 letras)
  const wordList = [
    "hotel", "porta", "livro", "rubor", "chuva", 
    "jarro", "balde", "tarde", "pedra", "noite",
    "sutil", "ideia", "tempo", "amigo", "nobre",
    "poder", "vigor", "sonho", "culto", "louco",
    "feliz", "regra", "banal", "ajuda", "manso"
  ];
  
  // Elementos do jogo
  const board = document.getElementById("board");
  const keys = document.querySelectorAll(".keyboard-row button");
  
  // Estado do jogo
  const secretWord = wordList[Math.floor(Math.random() * wordList.length)];
  let currentGuess = [];
  let currentRow = 0;

  // Cria o tabuleiro do jogo
  for (let i = 0; i < 30; i++) {
    const square = document.createElement("div");
    square.className = "square";
    square.id = `square-${i}`;
    board.appendChild(square);
  }

  // Adiciona letra 
  function addLetter(letter) {
    if (currentGuess.length < 5) {
      currentGuess.push(letter);
      updateBoard();
    }
  }

  // Remove a última letra
  function removeLetter() {
    if (currentGuess.length > 0) {
      currentGuess.pop();
      updateBoard();
    }
  }

  // Atualiza a exibição no tabuleiro
  function updateBoard() {
    for (let i = 0; i < 5; i++) {
      const square = document.getElementById(`square-${currentRow * 5 + i}`);
      square.textContent = currentGuess[i] || "";
    }
  }

  // Verifica o palpite
  function checkGuess() {
    if (currentGuess.length !== 5) {
      alert("Precisa ter 5 letras!");
      return;
    }

    const guess = currentGuess.join("");
    
    // Mostra feedback
    showFeedback(guess);

    // Verifica se o usuário adivinhou palavra c
    if (guess === secretWord) {
      setTimeout(() => alert("Parabéns! Você acertou!"), 500);
      return;
    }

    // Próxima tentativa
    currentRow++;
    currentGuess = [];
    
    // Fim do jogo
    if (currentRow === 6) {
      setTimeout(() => alert(`Game Over! A palavra era: ${secretWord}`), 500);
    }
  }

  // Mostra as cores de feedback
  function showFeedback(guess) {
    for (let i = 0; i < 5; i++) {
      const square = document.getElementById(`square-${currentRow * 5 + i}`);
      const letter = guess[i];
      
      if (secretWord[i] === letter) {
        square.style.backgroundColor = "#538d4e"; // Letra correta na posição certa
      } else if (secretWord.includes(letter)) {
        square.style.backgroundColor = "#b59f3b"; // Letra correta na posição errada
      } else {
        square.style.backgroundColor = "#3a3a3c"; // Letra não existe na palavra
      }
    }
  }

  // Configura os botões do teclado
  keys.forEach(key => {
    key.addEventListener("click", () => {
      const action = key.dataset.key;
      
      if (action === "enter") {
        checkGuess();
      } else if (action === "del") {
        removeLetter();
      } else {
        addLetter(action);
      }
    });
  });
});
