import prompt from "prompt-sync";
import * as fs from 'fs'
import * as readline from 'readline'
import { Personagem } from "./src/modelos/Personagem";
import { Guerreiro } from "./src/modelos/classes/guerreiro";
import { Mago } from "./src/modelos/classes/mago";
import { Arqueiro } from "./src/modelos/classes/arqueiro";
import { Paladino } from "./src/modelos/classes/paladino";
import { Necromante } from "./src/modelos/classes/necromante"
import { goblin } from "./src/modelos/inimigos/goblin";
import { esqueleto } from "./src/modelos/inimigos/esqueleto";
import { javali } from "./src/modelos/inimigos/javali";
import { serpente } from "./src/modelos/inimigos/serpente";
import { zumbi } from "./src/modelos/inimigos/zumbi";



const teclado = prompt();


function tabclass() {
    fs.writeFileSync('gamedados/classes.txt', '1. Guerreiro\n2. Mago\n3. Arqueiro\n4. Paladino\n5. Necromante');
    const pastclass = fs.readFileSync('gamedados/classes.txt', 'utf-8');
    console.log(pastclass + "\n");

}
function criacaoPersonagem(perso: Personagem) {
    console.log("Bem Vindo a Criação de personagem!! ");
    console.log("================================");
    let nome = teclado("Nome do Personagem: ");
    console.log("================================");
    let generoInput = teclado("Escolha seu gênero (M/F): ").toUpperCase();
    console.log("================================");

    tabclass();
    const escolha = +teclado("Selecione sua classe acima: ");


    switch (escolha) {
        case 1: perso = new Guerreiro(); break;
        case 2: perso = new Mago(); break;
        case 3: perso = new Arqueiro(); break;
        case 4: perso = new Paladino(); break;
        case 5: perso = new Necromante(); break;
        default:
            console.log("Escolha inválida, criando Guerreiro por padrão.");
            nome = "Aventureiro";
            generoInput = "M";
            perso = new Guerreiro();
    }
    //FIXME: preciso mudar tal coisa
    if (generoInput === 'M') {
        generoInput = "Masculino";
    } else if (generoInput === 'F') {
        generoInput = "Feminino";
    }

    const nomeDasClasses = ["Guerreiro", "Mago", "Arqueiro", "Paladino", "Necromante"];
    const classnome = nomeDasClasses[escolha - 1] || "Guerreiro";
    perso.nome = nome;
    perso.genero = generoInput
    perso.classe = classnome;

    fs.writeFileSync("saves/personagem.json", JSON.stringify(perso, null, 2));
    console.log(`\n${perso.nome}, o ${classnome}, foi criado com sucesso!`);
    save(perso);
}

function statusPersonagem() {
    const perso = carregarPersonagem();
    console.log(`\nNome: ${perso.nome}`);
    console.log(`Gênero: ${perso.genero}`);
    console.log(`Classe: ${perso.classe}`);
    console.log(`Vida: ${perso.vida}`);
    console.log(`Força: ${perso.forca}`);
    console.log(`Velocidade: ${perso.velocidade}`);
    console.log(`Defesa: ${perso.defesa}`);
    console.log(`Magia: ${perso.magia}`);
    console.log(`Defesa Mágica: ${perso.defmagica}\n`);
}

function tabela() {
    let continuar = true;

    while (continuar) {
        console.log("\nA tabela de classes é a seguinte: \n");
        console.log("================================");
        console.log("1. Guerreiro \n2. Mago \n3. Arqueiro \n4. Paladino \n5. Necromante");
        console.log("================================");
        const classe = +teclado("Selecione a classe para ver os status ou aperta 0 para sair: ");
        console.log("================================");
        switch (classe) {
            case 0:
                console.log("Saindo da tabela...");
                continuar = false;
                break;
            case 1:
                console.log("Guerreiro \nForça: 8 \nVelocidade: 6 \nDefesa: 7 \nMagia: 2 \nDefesa Mágica: 3");
                teclado("Pressione enter para continuar... ");
                break;
            case 2:
                console.log("Mago \nForça: 2 \nVelocidade: 5 \nDefesa: 3 \nMagia: 10 \nDefesa Mágica: 7");
                teclado("Pressione enter para continuar... ");
                break;
            case 3:
                console.log("Arqueiro \nForça: 6 \nVelocidade: 9 \nDefesa: 5 \nMagia: 3 \nDefesa Mágica: 4");
                teclado("Pressione enter para continuar... ");
                break;
            case 4:
                console.log("Paladino \nForça: 7 \nVelocidade: 3 \nDefesa: 8 \nMagia: 5 \nDefesa Mágica: 7");
                teclado("Pressione enter para continuar... ");
                break;
            case 5:
                console.log("Necromante \nForça: 3 \nVelocidade: 4 \nDefesa: 4 \nMagia: 9 \nDefesa Mágica: 6");
                teclado("Pressione enter para continuar... ");
                break;
            default:
                console.log("Classe inválida!");
        }
    }
}

async function iniciarJogo(): Promise<void> {

    let larguramap = 20;
    let alturamap = 10;

    const spriteparede = '#';
    const spriteparede2 = 'X';
    const spritechao = '.';
    const usuario = 'p';
    const inimigo = 'i';
    const portal = 'O';
    let mapa: string[][] = Array(alturamap).fill(0).map(() => Array(larguramap).fill(spritechao));

    for (let y = 0; y < alturamap; y++) {
        if (!mapa[y]) continue;
        for (let x = 0; x < larguramap; x++) {
            if (y === 0 || y === alturamap - 1 || x === 0 || x === larguramap - 1) {
                mapa[y]![x] = spriteparede;
            }
        }
    }
    let portalPos = { x: 0, y: 0 };
    while (portalPos.x === 0 || portalPos.x === larguramap - 1 || portalPos.y === 0 || portalPos.y === alturamap - 1) {
        portalPos = {
            x: Math.floor(Math.random() * (larguramap - 2)) + 1,
            y: Math.floor(Math.random() * (alturamap - 2)) + 1
        };
    }
    let playerPos = { x: 2, y: 2 };
    mapa[playerPos.y]![playerPos.x] = usuario;

    if (mapa[portalPos.y]) {
        mapa[portalPos.y]![portalPos.x] = portal;
    }

    let inimigoPos = {
        x: Math.floor(larguramap / 2),
        y: Math.floor(alturamap / 2)
    };
    mapa[inimigoPos.y]![inimigoPos.x] = inimigo;

    if (mapa[playerPos.y]![playerPos.x] === mapa[portalPos.y]![portalPos.x]) {
        console.log("Você Entrou em um portal, assim sendo levado a uma parte mais obscura da masmorra!");
        process.exit(0);
        alturamap += 5;
        larguramap += 5;
        mapa = Array(alturamap).fill(0).map(() => Array(larguramap).fill(spritechao));
        for (let y = 0; y < alturamap; y++) {
            if (!mapa[y]) continue;
            for (let x = 0; x < larguramap; x++) {
                if (y === 0 || y === alturamap - 1 || x === 0 || x === larguramap - 1) {
                    mapa[y]![x] = spriteparede2;
                }
            }
        }
        playerPos = { x: 2, y: 2 };

    }
    function renderizarMapa(map: string[][]) {
        console.clear();
        for (let y = 0; y < map.length; y++) {
            if (!map[y]) continue;
            console.log(map[y]!.join(' '));
        }
    }

    function moverJogador(dx: number, dy: number) {
        const nx = playerPos.x + dx;
        const ny = playerPos.y + dy;

        if (nx < 1 || nx >= larguramap - 1 || ny < 1 || ny >= alturamap - 1) {
            return;
        }

        if (!mapa[ny] || mapa[ny][nx] === spriteparede) {
            return;  // esse if é pra impedir o jogador de atravessar as paredes, caso tente atravessar a parede o movimento é cancelado e o jogador permanece na posição atual
        }

        if (mapa[ny] && mapa[ny][nx] === inimigo) {
            console.log("Você encontrou um inimigo! Prepare-se para a batalha!");
            iniciarBatalha();
            if (mapa[ny] && mapa[ny][nx] === inimigo) {
                console.log("\nVocê deseja continuar explorando ou sair do jogo? (continuar/sair)");
                const escolha = teclado("Digite a opção: ");
                if (escolha.toLowerCase() === "continuar") {
                    mapa[ny][nx] = spritechao;
                    return false;
                }
                else if (escolha.toLowerCase() === "sair") {
                    console.log("Saindo do jogo...");
                    process.stdin.emit('keypress', 'q', { name: 'q' });
                    return true;
                }
            }
        }

        if (mapa[playerPos.y]) {
            mapa[playerPos.y]![playerPos.x] = spritechao; // esse if é pra limpar a posição atual do jogador no mapa, ou seja, substituir o 'p' pelo '.' para que o mapa seja atualizado corretamente quando o jogador se mover. Sem isso, o mapa mostraria vários 'p' nas posições anteriores do jogador, o que não é desejado.
        }

        playerPos = { x: nx, y: ny };

        if (mapa[playerPos.y]) {
            mapa[playerPos.y]![playerPos.x] = usuario; // esse if é pra colocar o 'p' na nova posição do jogador no mapa, ou seja, atualizar a posição do jogador para refletir o movimento. Sem isso, o mapa não mostraria o jogador na nova posição, o que não é desejado.
        }

        renderizarMapa(mapa);
    }

    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
    }

    renderizarMapa(mapa);
    console.log("Use W/A/S/D para mover, Q para sair ao menu");

    return new Promise<void>((resolve) => {
        const keypressListener = (str: string, key: readline.Key) => {
            const encerrarMapa = () => {
                process.stdin.removeListener('keypress', keypressListener);
                if (process.stdin.isTTY) process.stdin.setRawMode(false);
                console.clear();
                resolve();
            }
            if (key.ctrl && key.name === 'c') {
                process.exit();
            } else if (str === 'q') {
                encerrarMapa();
            } else if (str === 'w') {
                moverJogador(0, -1);
            } else if (str === 's') {
                moverJogador(0, 1);
            } else if (str === 'a') {
                moverJogador(-1, 0);
            } else if (str === 'd') {
                moverJogador(1, 0);
            }

        };


        process.stdin.on('keypress', keypressListener);
    });
}

function iniciarBatalha() {
    const perso = (carregarPersonagem());
    //const inimigo = new Duelo(new Inimigo("goblin", 100, 3, 7, 2, 2, 3)); 
    const sinimigo = [goblin, javali, esqueleto, zumbi, serpente];
    const aleatorioi = Math.floor(Math.random() * sinimigo.length);
    const inimigo = (new sinimigo[aleatorioi]!());

    let turno = 1;

    while (perso.vida > 0 && inimigo.vida > 0) {
        console.log(`\n============ Turno ${turno} ============`);
        console.log(`\n A ${inimigo.nome} apareceu! Prepare-se para a batalha!`);
        console.log(`\n Sua vida: ${perso.vida} | Vida do ${inimigo.nome}: ${inimigo.vida}`);

        console.log("\nVocê deseja atacar ou fugir? (atacar/fugir)");
        const acao = teclado("Digite a opção: ");

        if (acao.toLowerCase() === "atacar") {
            const tipoAtaque = teclado(`Você ${perso.nome} deseja usar ataque físico ou mágico? (físico/mágico) `);

            if (tipoAtaque.toLowerCase() === "físico" || tipoAtaque.toLowerCase() === "fisico") {


                const msgAtaquePlayer = inimigo.receberDanoFisico(perso.danoAtaqueFisico());
                console.log(`\n-> ${msgAtaquePlayer}`);

            } else if (tipoAtaque.toLowerCase() === "mágico" || tipoAtaque.toLowerCase() === "magico") {

                const msgAtaquePlayer = inimigo.receberDanoMagica(perso.danoAtaqueMagica());
                console.log(`\n-> ${msgAtaquePlayer}`);

            }
            if (inimigo.vida > 0) {
                const potencialFisico = inimigo.danoAtaqueFisico();
                const potencialMagico = inimigo.danoAtaqueMagica();

                let msgAtaqueInimigo = "";


                if (potencialFisico >= potencialMagico) {
                    msgAtaqueInimigo = perso.receberDanoFisico(potencialFisico);
                } else {
                    msgAtaqueInimigo = perso.receberDanoMagica(potencialMagico);
                }

                console.log(`\n-> O inimigo contra-atacou: ${msgAtaqueInimigo}`);
            }

            if (inimigo.danoPassivo() > 0 && perso.vida > 0) {
                const valorPassivo = inimigo.danoPassivo();
                perso.vida -= valorPassivo;
                console.log(`\n[EFEITO] A ${inimigo.nome} aplicou um efeito! Você sofreu +${valorPassivo} de dano passivo.`);
            }


        } else if (acao.toLowerCase() === "fugir") {
            console.log("Você fugiu da batalha!");
            break;
        } else {
            console.log("Opção inválida. Por favor, escolha 'atacar' ou 'fugir'.");
        }
        turno++;
        if (perso.vida <= 0) {
            console.log("\n Você foi derrotado pelo inimigo...");
            break;
        } else if (inimigo.vida <= 0) {
            console.log("\n Parabéns! Você solou o inimigo!");
            break;
        }
    }
}

function bestiario() {
    let continuar = true;

    while (continuar) {
        console.log("\n A tabela de classes é a seguinte: \n");
        console.log("================================");
        console.log("1. Goblin \n2. Javali \n3. Esqueleto \n4. Zumbi \n5. Serpente");
        console.log("================================");
        const inimigo = +teclado("Selecione o inimigo para ver os status ou aperta 0 para sair: ");
        console.log("================================");
        switch (inimigo) {
            case 0:
                console.log("Saindo do bestiário...");
                continuar = false;
                break;
            case 1:
                console.log("Esqueleto \nForça: 3 \nVelocidade: 4 \nDefesa: 2 \nMagia: 0 \nDefesa Mágica: 4 ");
                teclado("Pressione enter para continuar... ");
                break;
            case 2:
                console.log("Javali \nForça: 6 \nVelocidade: 7 \nDefesa: 5 \nMagia: 0 \nDefesa Mágica: 3 ");
                teclado("Pressione enter para continuar... ");
                break;
            case 3:
                console.log("Goblin \nForça: 3 \nVelocidade: 7 \nDefesa: 2 \nMagia: 2 \nDefesa Mágica: 3 ");
                teclado("Pressione enter para continuar... ");
                break;
            case 4:
                console.log("Serpente \nForça: 5 \nVelocidade: 8 \nDefesa: 4 \nMagia: 0 \nDefesa Mágica: 2 ");
                teclado("Pressione enter para continuar... ");
                break;
            case 5:
                console.log("Zumbi \nForça: 4 \nVelocidade: 3 \nDefesa: 5 \nMagia: 0 \nDefesa Mágica: 3 ");
                teclado("Pressione enter para continuar... ");
                break;
            default:
                console.log("Classe inválida!");
        }
    }
}

function sair() {
    console.log("Para sair Digite 0, para continuar digite 1");
    const end = +teclado("Opção: ");
    if (end === 0) {
        process.exit(0);
    }
}

function save(perso: Personagem) {

    // fs.writeFileSync("saves/save.txt", `${perso.nome},${perso.genero},${perso.classe}`);
    const dadosPersonagem = {
        nome: perso.nome,
        genero: perso.genero,
        classe: perso.classe,
        vida: perso.vida,
        forca: perso.forca,
        velocidade: perso.velocidade,
        defesa: perso.defesa,
        magia: perso.magia,
        defmagica: perso.defmagica
    };
    fs.writeFileSync("saves/personagem.json", JSON.stringify(dadosPersonagem, null, 2));
}


function carregarPersonagem(): Personagem {
    try {
        const dadosJson = fs.readFileSync("saves/personagem.json", "utf-8");
        const dados = JSON.parse(dadosJson);

        const perso = new Guerreiro;

        perso.nome = dados.nome;
        perso.genero = dados.genero;
        perso.classe = dados.classe;

        console.log("Personagem carregado do arquivo!");
        return perso;
    } catch (error) {
        console.log("Nenhum personagem salvo encontrado. crie um novo personagem.");
        // Se não houver arquivo, criar um personagem padrão
        const persoPadrao = new Guerreiro;
        persoPadrao.nome = "Aventureiro";
        persoPadrao.genero = "Masculino";
        persoPadrao.classe = "Guerreiro";
        return persoPadrao;
    }

}

const perso: Personagem = new Guerreiro; // Valores padrão iniciais


async function main() {
    while (true) {
        console.log("================================\n");
        console.log("1. Criar Personagem");
        console.log("2. Status do Personagem");
        console.log("3. Listar Classes") // ainda em duvida se aqui simplesmente ponho o inicio do jogo ou se apenas criação de mapa, sla
        console.log("4. Iniciar Jogo");
        console.log("5. Teste Batalha");
        console.log("6. Bestiário");
        console.log("7. Sair do Jogo");

        console.log("\n ================================");

        const escolha = +teclado("Digite a opção: ")

        switch (escolha) {
            case 1:
                criacaoPersonagem(perso);
                break;
            case 2:
                statusPersonagem();
                break;

            case 3:
                tabela();
                break;
            case 4:
                await iniciarJogo();
                break;
            case 5:
                iniciarBatalha();
                break;
            case 6:
                bestiario();
                break;
            case 7:
                sair();
                break;
            default:
                console.log("Opção inválida, selecione uma das opções acima!!");
                break;
        } // Fecha switch
    } // Fecha while
}


main();

//npx ts-node  Main.ts
//npx jest
//sdds godscreation



