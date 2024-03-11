window.onload = function() {
  const gamebg = document.getElementById("ballgame");
  const ballbg = document.getElementById("ballballgame");
  const squarebg = document.getElementById("squareballgame");

  gamebg.addEventListener("click", () => {
    const novaCor = randomColor();
    ballbg.style.backgroundColor = novaCor;
  });

  function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Movimenta a bolinha com as setas do teclado
  gamebg.addEventListener("keydown", (e) => {
    const key = e.key;
    let top = parseInt(ballbg.style.top);
    let left = parseInt(ballbg.style.left);
  
    if (key === 38) { // Cima
      top -= 10;
    } else if (key === 40) { // Baixo
      top += 10;
    } else if (key === 37) { // Esquerda
      left -= 10;
    } else if (key === 39) { // Direita
      left += 10;
    }
  
    // Limites da tela
    if (top < 0) top = 0;
    if (top > gamebg.clientHeight - ballbg.clientHeight) top = gamebg.clientHeight - ballbg.clientHeight;
    if (left < 0) left = 0;
    if (left > gamebg.clientWidth - ballbg.clientWidth) left = gamebg.clientWidth - ballbg.clientWidth;
  
    ballballgames.style.top = top + "px";
    ballballgames.style.left = left + "px";
  
    // Verifica colisão com o quadrado preto
    const colidiu = verificaColisao(ballbg, squarebg);
    if (colidiu) {
      alert("Você Venceu!");
      // Reinicia o jogo
    }
  });
  
  function verificaColisao(ballbg, squarebg) {
    const ballbgRect = ballbg.getBoundingClientRect();
    const squarebgRect = squarebg.getBoundingClientRect();
    return ballbgRect.top < squarebgRect.bottom &&
      ballbgRect.right > squarebgRect.left &&
      ballbgRect.bottom > squarebgRect.top &&
      ballbgRect.left < squarebgRect.right;
  }  

};




