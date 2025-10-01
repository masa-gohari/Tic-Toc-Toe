
  // 🎯 انتخاب عناصر HTML
  const tiles = Array.from(document.querySelectorAll(".tile"));
  const playerDisplay = document.querySelector(".display-player");
  const resetButton = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");

  // 🧩 وضعیت بازی
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  // 🏆 حالت‌های پایان بازی
  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";

  // ✅ ترکیب‌های برنده
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  // 👆 واکنش به کلیک کاربر
  function userAction(tile, index) {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      if (isGameActive) changePlayer();
    }
  }

  // 🔍 بررسی اعتبار حرکت
  function isValidAction(tile) {
    return tile.innerText === "";
  }

  // 🧱 به‌روزرسانی وضعیت صفحه
  function updateBoard(index) {
    board[index] = currentPlayer;
  }

  // 🔄 تغییر بازیکن
  function changePlayer() {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  }

  // 🔍 بررسی نتیجه بازی
  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes("")) {
      announce(TIE);
    }
  }

  // 📢 نمایش نتیجه
  function announce(type) {
    switch (type) {
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case PLAYERO_WON:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        break;
      case TIE:
        announcer.innerText = "Tie";
        break;
    }
    announcer.classList.remove("hide");
  }

  // 🔁 ریست کردن بازی
  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");

    if (currentPlayer === "O") {
      changePlayer();
    }

    tiles.forEach(function (tile) {
      tile.innerText = "";
      tile.classList.remove("playerX");
      tile.classList.remove("playerO");
    });
  }

  // 🖱️ اتصال رویدادها
  tiles.forEach(function (tile, index) {
    tile.addEventListener("click", function () {
      userAction(tile, index);
    });
  });

  resetButton.addEventListener("click", resetBoard);
