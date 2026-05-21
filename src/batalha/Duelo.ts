import { Inimigo } from "../modelos/Inimigo.ts";
import { Personagem } from "../modelos/Personagem.ts";


/* export class Duelo {
    public lutador: Personagem | Inimigo;
    constructor(lutador: Personagem | Inimigo) {
        this.lutador = lutador;
}

    public danoAtaqueF(): number {
        return this.lutador.forca * 10;
    }
    public danoAtaqueM(): number {
        return this.lutador.magia * 10;
    }

    public percentualDefesaF(): number {
        return (this.lutador.defesa / (this.lutador.defesa + 8));
    }

    public danoMitigadoF(danoAtaqueF: number): number {
        const reducao = 1 - this.percentualDefesaF();
        return Math.round(danoAtaqueF * reducao);
    }

    public percentualDefesaM(): number {
        return this.lutador.defmagica / (this.lutador.defmagica + 8);
    }

    public danoMitigadoM(danoAtaqueF: number): number {
        const reducao = 1 - this.percentualDefesaM();
        return Math.round(danoAtaqueF * reducao);
    }

    public percentualEsquiva(): number {
        return this.lutador.velocidade / (this.lutador.velocidade + 18.67);
    }

    public rolouEsquiva(): boolean {
        return Math.random() < this.percentualEsquiva();
    }

    public rolouCritico(): boolean {
        return Math.random() < 0.05;
    }
    

    public receberDanoF(danoAtaqueF: number): number {
        if (this.rolouEsquiva()) {
            return 0;
        }
    
        let danoAplicado = this.danoMitigadoF(danoAtaqueF);

        if (this.rolouCritico()) {
            danoAplicado = Math.floor(danoAplicado * 1.5);
        }

        this.lutador.vida -= danoAplicado;

        return danoAplicado;

    }

    public receberDanoM(danoAtaqueM: number): number {
        if (this.rolouEsquiva()) {
            return 0;
        }
    
        let danoAplicado = this.danoMitigadoM(danoAtaqueM);

        if (this.rolouCritico()) {
            danoAplicado = Math.floor(danoAplicado * 1.5);
        }

        this.lutador.vida -= danoAplicado;

        return danoAplicado;
    }

}