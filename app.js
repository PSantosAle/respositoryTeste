let listaNumerosSorteados =[];
let numeroLimite =10;
let numeroSecreto = gerarNumeroAleatorio(); 
let tentativas =1;
console.log(numeroSecreto);
exibirMensagemInicial();


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo número Secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 10'); 
}


function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('h1','Você acertou');
        exibirTextoNaTela('p',mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor');
        }else{
            exibirTextoNaTela('p','O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeNumerosLista = listaNumerosSorteados.length;

   if(quantidadeNumerosLista == numeroLimite){
        listaNumerosSorteados =[];
   }
   if(listaNumerosSorteados.includes(numeroEscolhido)){
      return gerarNumeroAleatorio();
   }else {
    listaNumerosSorteados.push(numeroEscolhido);
    console.log(listaNumerosSorteados);
     return numeroEscolhido
   }
} 

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    document.getElementById('reiniciar').setAttribute('disabled',true);
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas =1;

}