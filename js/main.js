
const addressForm = document.querySelector('#address-form')
const cepInput = document.querySelector('#cep')
const addressInput = document.querySelector('#address')
const cityInput = document.querySelector('#city')
const neighborhoodInput = document.querySelector('#neighborhood')
const regionInput = document.querySelector('#region')
const formInputs = document.querySelectorAll('[data-input]')

const closeButton = document.querySelector('#close-message')

const fadeElement = document.querySelector('#fade')

// Evento de tecla digitada
cepInput.addEventListener('keypress', (event) => {
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(event.keyCode)

    // Permitindo apenas números
    if(!onlyNumbers.test(key)) {
        event.preventDefault()
        return
    }
})

// Evento quando tiver 8 digitos 
cepInput.addEventListener("keyup", (event) => {
    const inputValue = event.target.value

    // Checando se tem os 8 digitos
    if(inputValue.length === 8){
        getAdress(inputValue)
    }
})

// Evento de click para fechar mensagem
closeButton.addEventListener('click', () => toggleMessage())

// Evento de cadastrar endereço
addressForm.addEventListener('submit', (event) => {
    event.preventDefault()

    toggleLoader()

    setTimeout(() => {
        toggleLoader()

        toggleMessage('Endereço cadastrado com sucesso!')

        addressForm.reset()

        toggleDisabled()
    }, 500)
})



// Consultar API e adicionar valores aos elementos
const getAdress = async (cep) => {
    toggleLoader()

    cepInput.blur()

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(apiUrl)

    const data = await response.json()

    // Configurando erro
    if(data.erro) {
        if(!addressInput.hasAttribute('disabled')){
            toggleDisabled()
        }

        addressForm.reset()
        toggleLoader()
        toggleMessage("CEP inválido, tente novamente.")
        return
    }

    if(addressInput.value == '') {
        toggleDisabled()
    }

   addressInput.value = data.logradouro
   cityInput.value = data.localidade 
   neighborhoodInput.value = data.bairro
   regionInput.value = data.uf

   toggleLoader()
}

// Adicionar ou remover atributo de desativação
const toggleDisabled = () => {
    if(regionInput.hasAttribute('disabled')) {
        formInputs.forEach((input) => {
            input.removeAttribute('disabled')
        })
    } else {
        formInputs.forEach((input) => {
            input.setAttribute('disabled', 'disabled')
        })
    }
}

// Exibir/Ocutar carregamento da API
const toggleLoader = () => {
    const loaderElement = document.querySelector('#loader')

    fadeElement.classList.toggle('hide')
    loaderElement.classList.toggle('hide')
} 

// Mostrar messagem
const toggleMessage = (msg) => {
    const messageElement = document.querySelector('#message')
    const messageElementText = document.querySelector('#message p')

    messageElementText.innerText = msg

    fadeElement.classList.toggle('hide')
    messageElement.classList.toggle('hide')
}



