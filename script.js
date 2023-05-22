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

  return closeModal; // Retorna a função closeModal
}

function initForm() {
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);

  function handleSubmit(event) {
    const button = document.querySelector('.button-loading');

    function startLoading() {
      button.classList.add('loading');

      // Simulando uma operação demorada
    }

    function stopLoading() {
      button.classList.remove('loading');
    }

    event.preventDefault();
    const name = document.querySelector('input[name=nome]').value;
    const sobrenome = document.querySelector('input[name=sobrenome]').value;
    const telefoneInput = document.querySelector('input[name=telefone]');
    const email = document.querySelector('input[name=email]').value;

    // Remove todos os caracteres não numéricos do número de telefone
    const telefone = telefoneInput.value.replace(/\D/g, '');

    // Validar o número de celular
    const regexCelular = /^[1-9]{2}9?[0-9]{8}$/;
    if (!regexCelular.test(telefone)) {
      alert('Por favor, insira um número de celular válido.');
      return; // Impede o envio do formulário
    }

    startLoading();

    fetch('https://api.sheetmonkey.io/form/5r2x9dgZJwvQnNQfoU5DZH', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, sobrenome, telefone, email }),
    }).then(() => {
      stopLoading();
      closeModal();
      form.reset();
      alert('formulario enviado')
    });
  }
  const closeModal = initModal(); // Atribui a função retornada a uma variável
  initModal()


  // Formata o número de celular enquanto o usuário digita
  const telefoneInput = document.querySelector('input[name=telefone]');
  telefoneInput.addEventListener('input', formatarTelefone);

  function formatarTelefone() {
    let telefone = telefoneInput.value;
    telefone = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona o formato (XX) X
    telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2'); // Adiciona o formato X-XXXX
    telefoneInput.value = telefone;
  }
}

initForm();

