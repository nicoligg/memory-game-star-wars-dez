document.addEventListener('DOMContentLoaded', () => {
  
  //list all card options
  const cardArray = [
    {
      name: 'vader',
      img: 'images/vader.png'
    },
    {
      name: 'leia',
      img: 'images/leia.png'
    },
    {
      name: 'chewbacca',
      img: 'images/chewbacca.jpg'
    },
    {
      name: 'r2d2',
      img: 'images/r2d2.png'
    },
    {
      name: 'c3p0',
      img: 'images/c3p0.png'
    },
    {
      name: 'luke',
      img: 'images/luke.png'
    },
    {
      name: 'grogu',
      img: 'images/grogu.png'
    },
    {
      name: 'han-solo',
      img: 'images/han-solo.png'
    },
    {
      name: 'rey',
      img: 'images/rey.png'
    },
    {
      name: 'vader',
      img: 'images/vader.png'
    },
    {
      name: 'leia',
      img: 'images/leia.png'
    },
    {
      name: 'chewbacca',
      img: 'images/chewbacca.jpg'
    },
    {
      name: 'r2d2',
      img: 'images/r2d2.png'
    },
    {
      name: 'c3p0',
      img: 'images/c3p0.png'
    },
    {
      name: 'luke',
      img: 'images/luke.png'
    },
    {
      name: 'grogu',
      img: 'images/grogu.png'
    },
    {
      name: 'han-solo',
      img: 'images/han-solo.png'
    },
    {
      name: 'rey',
      img: 'images/rey.png'
    }
  ]

  //Audios

  const error = `sounds/error.mp3`;
  const uhoh = `sounds/uh-oh.mp3`;
  const vct = `sounds/victory.mp3`;
  const crt = `sounds/correct.mp3`;

  const audioERROR = new Audio(error);
  const audioUHOH = new Audio(uhoh);
  const audioVCT = new Audio(vct);
  const audioCRT = new Audio(crt);

  //Playlist

  $(document).ready(function () {


    $('#selection').on('change', function () {
      change($(this).val());
    });


  });

  function change(sourceUrl) {
    var audio = document.getElementById("player");
    var source = document.getElementById("mp3_src");

    audio.pause();

    if (sourceUrl) {
      source.src = sourceUrl;
      audio.load();
      audio.play();
    }
  }

  //create your board

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/carta.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      card.addEventListener('mouseover', () => addEffect(i));
      card.addEventListener('mouseout', () => removeEffect(i));
      grid.appendChild(card);
    }
  }

  //White glow effect

  const addEffect = (cardId) => {
    const card = document.querySelector(`[data-id="${cardId}"]`);
    card.classList.add("active");
  };

  const removeEffect = (cardId) => {
    const card = document.querySelector(`[data-id="${cardId}"]`);
    card.classList.remove("active");
  };

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/carta.png')
      cards[optionTwoId].setAttribute('src', 'images/carta.png')
      audioUHOH.play()
      alert('Você clicou na mesma imagem!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      audioCRT.play()
      alert('Você encontrou o par')
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionOneId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/carta.png')
      cards[optionTwoId].setAttribute('src', 'images/carta.png')
      audioERROR.play()
      alert('Desculpe, tente novamente')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = 'Parabéns! Você encontrou todos!';
      audioVCT.play()
    }
  }


  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})

