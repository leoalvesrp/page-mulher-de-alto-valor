function initModal() {
  const modal = document.querySelector('.modal');
  const buttonBuy = document.querySelector('.button-buy');
  const close = document.querySelector('.close');

  close.addEventListener('click', handleCloseModal);
  buttonBuy.addEventListener('click', handleOpenModal);
  window.addEventListener('click', handleClickOutsideModal);

  function handleCloseModal() {
    closeModal();
  }

  function handleOpenModal() {
    openModal();
  }

  function handleClickOutsideModal(event) {
    if (event.target === modal) {
      closeModal();
    }
  }

  function openModal() {
    modal.style.display = 'block';
    setTimeout(function() {
      modal.classList.add('modal-abrir');
    }, 10);
  }

  function closeModal() {
    modal.classList.remove('modal-abrir');
    setTimeout(function() {
      modal.style.display = 'none';
    }, 500);
  }
}

initModal();
