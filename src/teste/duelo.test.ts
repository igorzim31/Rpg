import {describe, expect, test} from '@jest/globals';
import { Personagem  } from "../modelos/Personagem.ts";
import { Inimigo } from "../modelos/Inimigo.ts";
import { Guerreiro } from '../modelos/classes/guerreiro.ts';
import { esqueleto } from '../modelos/inimigos/esqueleto.ts';



describe("Sistema de Batalha", () => {
    test("Deve calcular o valor base do dano de ataque a partir dos atributos do lutador", () => {
        //Cenário
        const lutadorp: Personagem = new Guerreiro;
        
        
        //Ação

        const resultado: number = lutadorp.danoAtaqueF();

        //Validação

        expect(resultado).toBe(80);

    })

    test("Deve calcular o percentual de redução de dano baseado na defesa do lutador", () => {
        //Cenário
         const lutadori: Inimigo = new esqueleto;

         //Ação
         const resultado: number = lutadori.percentualDefesaF();
         
         //Validação

         expect(resultado).toBe(4 / 12);
    })

    test("O personagem deve mitigar o dano de ataque baseado em seu percentual de defesa ", () => {
        //Cenário,
        const lutadorp: Personagem = new Guerreiro;
        const lutadori: Inimigo = new esqueleto;

        const ataquei: number = lutadori.danoAtaqueF();
        const mitigarp: number = lutadorp.percentualDefesaF();

        //Ação
        const resultado: number = lutadorp.danoMitigadoF(ataquei);

        //Validação

        expect(resultado).toBe(16);


    })
})