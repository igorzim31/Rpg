import { Personagem } from "./Personagem";

export interface DAOPersonagem2 {
    salvar(personagem: Personagem): void;
    buscarPorId(id: number): Personagem | null;
    listar(): Personagem[];
}