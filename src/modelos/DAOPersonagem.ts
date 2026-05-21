import { Personagem } from "./Personagem.ts";

export interface DAOPersonagem {
    salvar(personagem: Personagem): void;
    buscarPorId(id: number): Personagem | null;
    listar(): Personagem[];
}