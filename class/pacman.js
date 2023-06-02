
class Pacman {
    constructor() {
        this.pacmanX = 1;
        this.pacmanY = 1;
        this.direction = "right";
        this.score = 0;

    }

    setDirection(direction) {
        this.direction = direction;
    }

    createPacmanElement() {
        const pacman = document.createElement("div");
        pacman.className = "pacman";
        pacman.style.left = this.pacmanX * 40 + "px";
        pacman.style.top = this.pacmanY * 40 + "px";

        const pacmanEye = document.createElement("div");
        pacmanEye.className = "pacman__eye";
        const pacmanMouth = document.createElement("div");
        pacmanMouth.className = "pacman__mouth";

        pacman.appendChild(pacmanEye);
        pacman.appendChild(pacmanMouth);

        return pacman;
    }


    checkCollision(mapElement, map, pScore) {
        const invincible = mapElement.querySelector("#invincible");

        const pacman = mapElement.querySelector(".pacman");
        const pacmanRect = pacman.getBoundingClientRect();

        const ghosts = mapElement.getElementsByClassName("ghost");
        for (let i = 0; i < ghosts.length; i++) {
            const ghost = ghosts[i];
            const ghostRect = ghost.getBoundingClientRect();

            // Vérifiez s'il y a une collision entre Pac-Man et le fantôme
            if (checkRectCollision(pacmanRect, ghostRect)) {
                if (invincible) {
                    ghost.remove(); // Supprime le fantôme du DOM
                    // Faites quelque chose d'autre lorsque le fantôme est supprimé (par exemple, incrémentation du score, etc.)
                } else {
                    openModal()
                        .then(() => {
                            // La promesse est résolue, le bouton "Recommencer" a été cliqué
                            this.resetGame(pScore, map)
                        })
                        .catch((err) => {
                            console.log(err);
                            // La promesse est rejetée, la modal a été fermée sans cliquer sur le bouton "Recommencer"
                            this.resetGame(pScore, map)
                        });
                }
                break;
            }
        }
    }

  


    resetGame(pScore, map) {

        // Réinitialisez les paramètres du jeu
        const mapElement = document.getElementById("map");
        this.score = 0;
        this.pacmanX = 1;
        this.pacmanY = 1;
        this.updateScore(pScore, this.score); // Mettez à jour l'affichage du score

        // Réinitialisez la position du Pac-Man
        const pacmanElement = document.querySelector(".pacman");
        pacmanElement.style.left = "40px";
        pacmanElement.style.top = "40px";

        const ghostColors = ["red", "pink", "orange"];
        const ghosts = [];
        generateGhosts(ghostColors,ghosts,mapElement,map);

        // Réinitialisez la carte en recréant les bonbons
        const bonbons = document.querySelectorAll(".bonbon");

        for (let i = 0; i < bonbons.length; i++) {
            bonbons[i].parentNode.removeChild(bonbons[i]);
        }

        // Recréez les boconsole.log(map);
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === 2) {
                    const block = mapElement.children[i * map[0].length + j];
                    const imgBlock = document.createElement("img");
                    imgBlock.src = "./pacman/bonbon.gif";
                    imgBlock.classList.add("bonbon");
                    block.appendChild(imgBlock);
                } else if (map[i][j] === 3) {
                    const block = mapElement.children[i * map[0].length + j];
                    const imgBlock = document.createElement("img");
                    imgBlock.src = "./pacman/bonbon.gif";
                    imgBlock.classList.add("bonbon", "super-bonbon");
                    block.appendChild(imgBlock);
                }
            }
        }

        // Supprimez le message de victoire s'il est affiché
        const itemScore = document.querySelector("#content-score");
        const messageVictoire = itemScore.querySelector("#victory-p");
        if (messageVictoire) {
            const buttonRestart = itemScore.querySelector("button");
            itemScore.removeChild(messageVictoire);

            itemScore.removeChild(buttonRestart)

            itemScore.appendChild(pScore);
        }

    }

    checkVictory(mapElement, pScore, map) {
        const itemScore = document.getElementById("content-score")
        const bonbons = mapElement.getElementsByClassName("bonbon");
        if (bonbons.length === 0) {
            // Tous les bonbons ont été collectés
            const messageVictoire = document.createElement("p");
            messageVictoire.id = "victory-p"
            messageVictoire.textContent = "Victoire ! Tous les bonbons ont été collectés.";

            const buttonReset = document.createElement("button");
            buttonReset.textContent = "Recommencer";
            buttonReset.onclick = () => this.resetGame(pScore, map); // Appeler la fonction resetGame() lors du clic sur le bouton

            itemScore.appendChild(buttonReset);
            itemScore.appendChild(messageVictoire);
        }
    }

    updateScore(pScore) {
        pScore.textContent = `Score: ${this.score}`;
    }


    incrementScore(pScore) {
        this.score++;
        this.updateScore(pScore, this.score);
    }

    getRotationAngle(NewAngle) {
        if (this.direction === "up") {
            return -90;
        } else if (this.direction === "down") {
            return 90;
        } else if (this.direction === "left") {
            return 180;
        } else if (this.direction === "right") {
            return 0;
        }
    }


    move(map, mapElement, pScore, itemScore) {
        const pacmanElement = document.querySelector(".pacman");
        let rotationAngle = 0;
        let scaleX = 1;
        let scaleY = 1;

        if (this.direction === "up") {
            rotationAngle = -90;
        } else if (this.direction === "down") {
            rotationAngle = 90;
            scaleY = -1;
        } else if (this.direction === "left") {
            scaleX = -1;
        }

        pacmanElement.style.transform = `rotate(${rotationAngle}deg) scaleX(${scaleX}) scaleY(${scaleY})`;

        // Vérifie si la modal est ouverte
        const modal = document.getElementById("modal");
        const isModalOpen = modal.style.display === "flex";
        const victory = document.getElementById("victory-p")

        // Arrête le mouvement si la modal est ouverte
        if (isModalOpen || victory) {
            return;
        }


        // Mettez à jour les coordonnées de Pac-Man en fonction de la direction
        if (
            this.direction === "up" &&
            this.pacmanY > 0 &&
            map[this.pacmanY - 1][this.pacmanX] !== 0
        ) {
            this.pacmanY--;
        } else if (
            this.direction === "down" &&
            this.pacmanY < map.length - 1 &&
            map[this.pacmanY + 1][this.pacmanX] !== 0
        ) {
            this.pacmanY++;
        } else if (
            this.direction === "left" &&
            this.pacmanX > 0 &&
            map[this.pacmanY][this.pacmanX - 1] !== 0
        ) {
            this.pacmanX--;
        } else if (
            this.direction === "right" &&
            this.pacmanX < map[0].length - 1 &&
            map[this.pacmanY][this.pacmanX + 1] !== 0
        ) {
            this.pacmanX++;
        }

        // Mettez à jour la position CSS de Pac-Man
        pacmanElement.style.left = this.pacmanX * 40 + "px";
        pacmanElement.style.top = this.pacmanY * 40 + "px";

        // Vérifie si le Pac-Man a touché un bonbon
        const currentBlock = mapElement.children[
            this.pacmanY * map[0].length + this.pacmanX
        ];
        const bonbon = currentBlock.querySelector(".bonbon");
        const superBonbon = currentBlock.querySelector(".super-bonbon");
        if (superBonbon) {

            bonbon.parentNode.removeChild(bonbon); // Fait disparaître le bonbon
            this.incrementScore(pScore);
            this.checkVictory(mapElement, pScore, map);

            pacmanElement.setAttribute("id", "invincible"); // Ajoute l'ID "invincible" à l'élément Pac-Man

            // Supprime l'ID "invincible" après 15 secondes
            setTimeout(function () {
                pacmanElement.removeAttribute("id", "invincible");
            }, 6000);


        } else if (bonbon) {
            bonbon.parentNode.removeChild(bonbon); // Fait disparaître le bonbon
            this.incrementScore(pScore);
            this.checkVictory(mapElement, pScore, map);
        }


    }

}
