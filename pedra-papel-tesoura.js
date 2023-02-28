// 28/02/2023


// Mão Computador
const lance = ['pedra','papel','tesoura'];

// retorna valor aleatório!
const computador = lance[Math.floor(Math.random() * 3)];
// verifica mãos
console.log(process.argv[2] +  ' dev');
console.log(computador + ' computador');

// Regras do jogo!
if(process.argv[2] === computador ){
   console.log(`Você escolheu ${process.argv[2]} e o computador escolheu ${computador}. Empate , tente novamente!`);
}
else if(process.argv[2] === 'pedra' && computador === 'tesoura')
{ 
    console.log(`Você escolheu ${process.argv[2]} e o computador escolheu ${computador}.  Você ganhou!`);
}

else if(process.argv[2] === 'papel' && computador === 'pedra')
{
    console.log(`Você escolheu ${process.argv[2]} e o computador escolheu ${computador}.  Você ganhou!`);
}

else if(process.argv[2] === 'tesoura' && computador === 'papel')
{
    console.log(`Você escolheu ${process.argv[2]} e o computador escolheu ${computador}. Você ganhou!`);    
}

else { 
    console.log(`Você escolheu ${process.argv[2]} e o computador escolheu ${computador}.Computador ganhou!`)
} 


