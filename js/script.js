window.addEventListener('DOMContentLoaded', function() {

  // Modals.
  const modalOpenBtn = document.querySelectorAll('[data-openBtn]'),
        modalEdit = document.querySelector('[data-editing]'),
        modalAdd = document.querySelector('[data-add]'),
        modalCloseBtn = document.querySelectorAll('[data-closeBtn]'),
        scroll = calcScroll();

  function toggleModal(popup) {
    if (popup && (popup.classList.contains('profile__edit-button') || popup.classList.contains('popup__close-icon_edit') || popup.classList.contains('popup__form-editing'))) {
      modalEdit.classList.toggle('popup_opened');
      modalOverflow(modalEdit);
      setNameForm();
    } else if (popup && (popup.classList.contains('profile__add-button') || popup.classList.contains('popup__close-icon_add') || popup.classList.contains('popup__form-add'))){
      modalAdd.classList.toggle('popup_opened');
      modalOverflow(modalAdd);
    }
  }

  function modalOverflow(modal) {
    if (modal.classList.contains('popup_opened')) {
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scroll}px`;
      const btn = modal.lastElementChild.lastElementChild;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          toggleModal(btn);
        }
      });
    } else {
      document.body.style.overflow = '';
      document.body.style.marginRight = '0';
    }
  }

  //Scroll delete
  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  modalOpenBtn.forEach(btn => {
    btn.addEventListener('click', (evt) => {
      toggleModal(evt.target)
    });
  })

  modalCloseBtn.forEach(btn => {
    btn.addEventListener('click', (evt) => {
      toggleModal(evt.target)
    });
  })

  //Template cards.
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://images.unsplash.com/photo-1672271688662-3a03bbb75ec9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Челябинская область',
      link: 'https://images.unsplash.com/photo-1672266820779-b36e41d48fdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Иваново',
      link: 'https://images.unsplash.com/photo-1672274696005-80d5f259d941?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Камчатка',
      link: 'https://plus.unsplash.com/premium_photo-1665311515315-b55de4b7d39f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Холмогорский район',
      link: 'https://images.unsplash.com/photo-1672281647004-22e1bb3f2fba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1672288407852-fa0c0003637c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
    }
  ];

  function addCard(name, link) {
    const container = document.querySelector('#element-template').content,
          sectionElements = document.querySelector('.elements'),
          cloneCard = container.querySelector('.element').cloneNode(true);

    cloneCard.querySelector('.element__img').src = link;
    cloneCard.querySelector('.element__img').alt = name;
    cloneCard.querySelector('.element__title').textContent = name;
    sectionElements.prepend(cloneCard);

    //Like Card
    cloneCard.querySelector('.element__icon').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__icon_active');
    });

    //Delete Card
    cloneCard.querySelector('.element__basket').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
    });

    // Big img
    const imgPopup = document.createElement('div'),
          imgPopupContainer = document.createElement('div'),
          closeBtn = document.createElement('button'),
          cloneImg = container.querySelector('.element__img');

    function openBigImg(img) {
      imgPopup.classList.add('popup', 'popup_opened');
      imgPopupContainer.classList.add('popup__container_big-img')
      closeBtn.classList.add('popup__close-icon', 'opacity');
      sectionElements.append(imgPopup)
      imgPopup.appendChild(imgPopupContainer);
      imgPopupContainer.appendChild(img);
      imgPopupContainer.appendChild(closeBtn);
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scroll}px`;
    }

    imgPopup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')) {
        imgPopup.remove();
        document.body.style.overflow = '';
        document.body.style.marginRight = '0';
      }
    });

    cloneCard.querySelector('.element__img').addEventListener('click', (evt) => {
      cloneImg.setAttribute('src', evt.target.src);
      cloneImg.setAttribute('alt', evt.target.alt);
      cloneImg.classList.add('element__img_active');
      openBigImg(cloneImg);
    });
  }

  initialCards.map(card => addCard(card.name, card.link))


  // Forms
  const editFormElement  = document.querySelector('form[name="popup-editing"]'),
        addFormCard  = document.querySelector('form[name="popup-add"]'),
        nameInput = document.querySelector('input[name="name"]'),
        jobInput = document.querySelector('input[name="hobby"]'),
        name = document.querySelector('.profile__name'),
        job = document.querySelector('.profile__text'),
        placeInput = document.querySelector('input[name="place"]'),
        linkInput = document.querySelector('input[name="link"]');

  function setNameForm () {
    nameInput.value = name.innerText;
    jobInput.value = job.innerText;
  }

  function handleEditFormSubmit() {
    name.textContent = nameInput.value.trim();
    job.textContent = jobInput.value.trim();
  }

  editFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleEditFormSubmit();
    toggleModal(evt.target);
  });

  function handleCardFormSubmit() {
    const place = placeInput.value.trim();
    const link = linkInput.value.trim();
    return {place, link};
  }

  addFormCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const { place, link } = handleCardFormSubmit()
    addCard(place, link);
    toggleModal(evt.target);
    addFormCard.reset();
  });

});


