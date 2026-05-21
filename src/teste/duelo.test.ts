import {describe, expect, test} from '@jest/globals';
import { Personagem  } from "../modelos/Personagem.ts";
import { Duelo } from "../batalha/Duelo.ts";
import { Inimigo } from "../modelos/Inimigo.ts";



describe("Sistema de Batalha", () => {
    test("Deve calcular o valor base do dano de ataque a partir dos atributos do lutador", () => {
        //Cenário
        const lutadorp: Personagem = new Personagem(100, 8, 6, 7, 2 , 3);
        const personagem: Duelo = new Duelo(lutadorp);
        
        //Ação

        const resultado: number = personagem.danoAtaqueF();

        //Validação

        expect(resultado).toBe(80);

    })

    test("Deve calcular o percentual de redução de dano baseado na defesa do lutador", () => {
        //Cenário
         const lutadori: Inimigo = new Inimigo ("esqueleto", 100, 3, 4, 4, 0, 4 );
         const inimigo: Duelo = new Duelo(lutadori);

         //Ação
         const resultado: number = inimigo.percentualDefesaF();
         
         //Validação

         expect(resultado).toBe(4 / 12);
    })

    test("O personagem deve mitigar o dano de ataque baseado em seu percentual de defesa ", () => {
        //Cenário,
        const lutadorp: Personagem = new Personagem(100, 8, 6, 7, 2 , 3);
        const lutadori: Inimigo = new Inimigo ("esqueleto", 100, 3, 4, 4, 0, 4 );
        const personagem: Duelo = new Duelo(lutadorp);
        const inimigo: Duelo = new Duelo(lutadori);

        const ataquei: number = inimigo.danoAtaqueF();
        const mitigarp: number = personagem.percentualDefesaF();

        //Ação
        const resultado: number = personagem.danoMitigadoF(ataquei);

        //Validação

        expect(resultado).toBe(16);


    })
})