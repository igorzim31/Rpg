import { ITeste } from "./ITeste.ts";


export abstract class Inimigo implements ITeste{
    protected _nome: string;
    protected _vida: number;
    protected _forca: number;
    protected _velocidade: number;
    protected _defesa: number;
    protected _magia: number;
    protected _defmagica: number;
    constructor(nome: string, vida: number, forca: number, velocidade: number, defesa: number, magia: number, defmagica: number) {
        this._nome = nome;
        this._vida = vida;
        this._forca = forca;
        this._velocidade = velocidade;
        this._defesa = defesa;
        this._magia = magia;
        this._defmagica = defmagica;
    }
    action(): void {
        throw new Error("Method not implemented.");
    }

    public danoAtaqueF(): number {
        return this.forca * 10;
    }
    public danoAtaqueM(): number {
        return this.magia * 10;
    }

    public percentualDefesaF(): number {
        return (this.defesa / (this.defesa + 8));
    }

    public danoMitigadoF(danoAtaqueF: number): number {
        const reducao = 1 - this.percentualDefesaF();
        return Math.round(danoAtaqueF * reducao);
    }

    public percentualDefesaM(): number {
        return this.defmagica / (this.defmagica + 8);
    }

    public danoMitigadoM(danoAtaqueF: number): number {
        const reducao = 1 - this.percentualDefesaM();
        return Math.round(danoAtaqueF * reducao);
    }

    public percentualEsquiva(): number {
        return this.velocidade / (this.velocidade + 18.67);
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

        this.vida -= danoAplicado;

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

        this.vida -= danoAplicado;

        return danoAplicado;
    }

    //sets e gets

    public get nome(): string {
        return this._nome;
    }
    public set vida(vida: number) {
        if (vida < 0) {
            this._vida = 0;
        } else {
            this._vida = vida;
        }
    }    
    public get vida(): number {
        return this._vida;
    }
    public get forca(): number {
        return this._forca;
    }
    public get velocidade(): number {
        return this._velocidade;
    }
    public get defesa(): number {
        return this._defesa;
    }
    public get magia(): number {
        return this._magia;
    }
    public get defmagica(): number {
        return this._defmagica;
    }
}




