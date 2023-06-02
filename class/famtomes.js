class Ghost {
  constructor(color, mapElement, map) {
    this.color = color;
    this.mapElement = mapElement;
    this.map = map;
    this.direction = this.getRandomDirection("");
    this.position = this.generateValidPosition();
    this.element = this.createGhostElement();
    mapElement.appendChild(this.element);
    this.targetX = this.position.x;
    this.targetY = this.position.y;
  }



  generateValidPosition() {
    let validPosition = false;
    let x, y;

    while (!validPosition) {
      x = Math.floor(Math.random() * (this.map[0].length - 2) + 1);
      y = Math.floor(Math.random() * (this.map.length - 2) + 1);

      if (this.map[y][x] !== 0 && this.map[y][x] !== 1) {
        validPosition = true;
      }
    }

    return { x, y };
  }
  createGhostElement() {
    const ghost = document.createElement("div");
    ghost.className = "ghost";
    ghost.style.left = this.position.x * 40 + "px";
    ghost.style.top = this.position.y * 40 + "px";
    ghost.style.backgroundColor = this.color;
    ghost.dataset.direction = this.direction;

    const eyesGhost = document.createElement("div")
    eyesGhost.className = "eyes"
    const skirt = document.createElement("div")
    skirt.className = "skirt"
    ghost.appendChild(eyesGhost);
    ghost.appendChild(skirt);


    return ghost;
  }

  getRandomDirection(currentDirection) {
    const directions = ["up", "down", "left", "right"];
    let randomDirection = directions[Math.floor(Math.random() * directions.length)];

    while (randomDirection === currentDirection) {
      randomDirection = directions[Math.floor(Math.random() * directions.length)];
    }

    return randomDirection;
  }

  checkNextDirection(currentDirection) {
    const directions = [];
  
    // Vérifie les directions possibles en fonction des cases adjacentes
    if (this.canMove(currentDirection)) {
      directions.push(currentDirection);
    }
    if (this.canMove("up") && currentDirection !== "down") {
      directions.push("up");
    }
    if (this.canMove("down") && currentDirection !== "up") {
      directions.push("down");
    }
    if (this.canMove("left") && currentDirection !== "right") {
      directions.push("left");
    }
    if (this.canMove("right") && currentDirection !== "left") {
      directions.push("right");
    }
  
    // Sélectionne une direction aléatoire parmi les directions possibles
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  }

  canMove(direction) {
    const { x, y } = this.position;
    const map = this.map;
  
    if (direction === "up") {
      return y > 0 && map[y - 1][x] !== 0;
    } else if (direction === "down") {
      return y < map.length - 1 && map[y + 1][x] !== 0;
    } else if (direction === "left") {
      return x > 0 && map[y][x - 1] !== 0;
    } else if (direction === "right") {
      return x < map[0].length - 1 && map[y][x + 1] !== 0;
    }
  
    return false;
  }
  
  


  move() {
    const ghostX = this.position.x;
    const ghostY = this.position.y;
    const currentDirection = this.direction;

    let newGhostX = ghostX;
    let newGhostY = ghostY;

    // Vérifie si la modal est ouverte
    const modal = document.getElementById("modal");
    const isModalOpen = modal.style.display === "flex";
    const victory = document.getElementById("victory-p");

    // Arrête le mouvement si la modal est ouverte
    if (isModalOpen || victory) {
      return;
    }

    this.direction = this.checkNextDirection(currentDirection);

    if (this.direction === "up" && ghostY > 0 && this.map[ghostY - 1][ghostX] !== 0) {
      newGhostY--;
    } else if (this.direction === "down" && ghostY < this.map.length - 1 && this.map[ghostY + 1][ghostX] !== 0) {
      newGhostY++;
    } else if (this.direction === "left" && ghostX > 0 && this.map[ghostY][ghostX - 1] !== 0) {
      newGhostX--;
    } else if (this.direction === "right" && ghostX < this.map[0].length - 1 && this.map[ghostY][ghostX + 1] !== 0) {
      newGhostX++;
    }

    const newLeft = newGhostX * 40 + "px";
    const newTop = newGhostY * 40 + "px";

    requestAnimationFrame(() => {
      this.element.style.left = newLeft;
      this.element.style.top = newTop;
      const invincible = document.querySelector("#invincible");
      if (invincible) {
        this.element.style.backgroundColor = "blue"; // Changer la couleur du fantôme ici
      } else {
        this.element.style.backgroundColor = this.color;
      }
    });

    this.position = { x: newGhostX, y: newGhostY };
  }

}
