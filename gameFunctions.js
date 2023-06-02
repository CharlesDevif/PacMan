
function addapterLaMapHxL(map) {
  const numRows = map.length;
  const numCols = map[0].length;


  const cellWidth = 40; // Largeur de chaque cellule en pixels
  const cellHeight = 40; // Hauteur de chaque cellule en pixels

  const mapWidth = numCols * cellWidth;
  const mapHeight = numRows * cellHeight;

  const mapDiv = document.getElementById('map');
  mapDiv.style.width = `${mapWidth}px`;
  mapDiv.style.height = `${mapHeight}px`;
}

function generateGhosts(ghostColors,ghosts,mapElement,map) {
  // Supprimez les fantômes existants s'ils sont présents
  const existingGhosts = mapElement.getElementsByClassName("ghost");
  while (existingGhosts.length > 0) {
    existingGhosts[0].parentNode.removeChild(existingGhosts[0]);
  }

  // Générez trois fantômes avec des couleurs différentes
  for (let i = 0; i < 3; i++) {
    const color = ghostColors[i];
    const ghost = new Ghost(color, mapElement, map);
    ghosts.push(ghost);
  }
  function moveGhosts() {
    for (let i = 0; i < ghosts.length; i++) {
      ghosts[i].move();

    }
  }
 
  setInterval(moveGhosts, 300);
}



function checkRectCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

async function openModal() {
  return new Promise((resolve, reject) => {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
  

    const restartButton = modal.querySelector('.restart-button');
    restartButton.addEventListener('click', () => {
      closeModal();
      resolve(); // Résout la promesse lorsque le bouton "Recommencer" est cliqué
    });

    modal.addEventListener('click', event => {
      if (event.target === modal) {
        closeModal();
        reject(); // Rejette la promesse si la modal est fermée sans cliquer sur le bouton "Recommencer"
      }
    });
  });
}

function closeModal() {

  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';

  const restartButton = modal.querySelector('.restart-button');
  restartButton.removeEventListener('click', closeModal);

  modal.removeEventListener('click', event => {
    if (event.target === modal) {
      closeModal();
    }
  });
}
