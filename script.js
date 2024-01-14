const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const musica = new Audio('/sons/good-night.mp3')
const playPauseBt = new Audio('/sons/play.wav')
const tempoFinalizado = new Audio('/sons/beep.mp3')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const trocarImagemPlayPause = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500 // declaração da variável para iniciar o contador
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }

})

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    // banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">'Concentre-se no essencial.'</strong>`

            break;

        case 'descanso-curto':
            titulo.innerHTML = `Respire fundo, <br>
            <strong class="app__title-strong">é hora de recarregar.</strong>`

            break;

        case 'descanso-longo':
            titulo.innerHTML = `Descanso merecido. <br>
            <strong class="app__title-strong">recarregue e continue.</strong>`

        default:
            break;
    }
}


focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
    tempoDecorridoEmSegundos = 1500
    mostrarTempo()
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
    tempoDecorridoEmSegundos = 300
    mostrarTempo()
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
    tempoDecorridoEmSegundos = 900
    mostrarTempo()

})

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) { // condicional para o temporizador
        tempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return

    }
    tempoDecorridoEmSegundos -= 1 // decrementa a cada 1 segundo
    mostrarTempo()

}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        playPauseBt.play();
        zerar()
        return
    }
    playPauseBt.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    trocarImagemPlayPause.src = ('src', `/imagens/pause.png`)

}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    intervaloId = null
    trocarImagemPlayPause.src = ('src', `/imagens/play_arrow.png`)

}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()