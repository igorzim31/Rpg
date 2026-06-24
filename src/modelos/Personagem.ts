

export abstract class Personagem{
   protected _nome: string;
   protected _genero: string;
   protected _classe: string;
   protected _vida: number; 
   protected _forca: number;
   protected _velocidade: number;
   protected _defesa: number;
   protected _magia: number;
   protected _defmagica: number;
    
    constructor(vida: number, forca: number, velocidade: number, defesa: number, magia: number, defmagica: number) {
        this._nome = "";
        this._genero = "";
        this._classe = "";
        this._vida = vida;
        this._forca = forca;
        this._velocidade = velocidade;
        this._defesa = defesa;
        this._magia = magia;
        this._defmagica = defmagica;
    }


    public danoAtaqueFisico(): number {
        return this.forca * 10;
    }
    public danoAtaqueMagica(): number {
        return this.magia * 10;
    }

    public percentualDefesaFisico(): number {
        return (this.defesa / (this.defesa + 8));
    }

    public danoMitigadoFisico(danoAtaqueFisico: number): number {
        const reducao = 1 - this.percentualDefesaFisico();
        return Math.round(danoAtaqueFisico * reducao);
    }

    public percentualDefesaMagica(): number {
        return this.defmagica / (this.defmagica + 8);
    }

    public danoMitigadoMagica(danoAtaqueMagica: number): number {
        const reducao = 1 - this.percentualDefesaMagica();
        return Math.round(danoAtaqueMagica * reducao);
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
    

    public receberDanoFisico(danoAtaqueFisico: number): string {
        let msg = ""
        if (this.rolouEsquiva()) {
           return `${this.nome} esquivou do ataque e não sofreu dano!`
        }
    
        // colocar Msg la em batalha depois
        let danoAplicado = this.danoMitigadoFisico(danoAtaqueFisico);
        msg = `${this.nome} recebeu ${danoAplicado} de dano físico!`;

        if (this.rolouCritico()) {
            danoAplicado = Math.floor(danoAplicado * 1.5);
            msg = `Ataque Crítico! ${this.nome} recebeu ${danoAplicado} de dano físico!`;
        }

        this.vida -= danoAplicado;

        return msg;

    }

    public receberDanoMagica(danoAtaqueMagica: number): string {
        let msg = ""
        if (this.rolouEsquiva()) {
            return `${this.nome} esquivou do ataque e não sofreu dano!`
        }
    
        let danoAplicado = this.danoMitigadoMagica(danoAtaqueMagica);
        msg = `${this.nome} recebeu ${danoAplicado} de dano Magico!`;

        if (this.rolouCritico()) {
            danoAplicado = Math.floor(danoAplicado * 1.5);
            msg = `Ataque Crítico! ${this.nome} recebeu ${danoAplicado} de dano Magico!`;
        }

        this.vida -= danoAplicado;

        return msg;
    }


    // sets e gets

    
    public set nome(nome: string) {
        if (nome.length < 3 || nome.length > 31){
            throw new Error("Tamanho do nome inválido")
        }
        this._nome = nome;
    }

    public get nome(): string{
        return this._nome;
    }

    public set genero(genero: string) {
        if (genero.charAt(0) !== "M" && genero.charAt(0)  !== "F"){
        
            throw new Error("bah")
        } 
        this._genero = genero;
    }

    public get genero(): string{
        return this._genero;
    }
   
    public set classe(classe: string) {
        const classesValidas = ["Guerreiro", "Mago", "Arqueiro", "Paladino", "Necromante"];
        if (!classesValidas.includes(classe)) {
            throw new Error("Classe inválida");
        }
        this._classe = classe;
    }

    public get classe(): string {
        return this._classe;
    }
    public set vida(vida: number) { 
        if (vida < 0) {
            this._vida = 0;
        }
        this._vida = vida;
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

   






