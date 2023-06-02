class Plateau {
  constructor(map, mapElement) {
    this.map = map;
    this.mapElement = mapElement;
  }

  generate() {
    


    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        const block = document.createElement("div");
        block.className = "block";
        block.style.left = j * 40 + "px";
        block.style.top = i * 40 + "px";
        if (this.map[i][j] === 0) {
          block.style.backgroundColor = "#14D2FF";
          block.style.boxShadow = "0px 0px 9px 1px rgb(20 168 255)";
        } else if (this.map[i][j] === 2) {
          block.style.backgroundColor = "transparent";
          const imgBlock = document.createElement("img");
          imgBlock.src = "./pacman/bonbon.gif";
          imgBlock.classList.add("bonbon");
          block.appendChild(imgBlock);
        } else if (this.map[i][j] === 3) {
          block.style.backgroundColor = "transparent";
          const imgBlock = document.createElement("img");
          imgBlock.src = "./pacman/bonbon.gif";
          imgBlock.classList.add("bonbon", "super-bonbon");
          block.appendChild(imgBlock);
        }
        this.mapElement.appendChild(block);
      }
    }
  }
}