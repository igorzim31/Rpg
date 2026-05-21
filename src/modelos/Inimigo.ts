

export class Inimigo {
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

export class goblin extends Inimigo {
    constructor() {
        super("goblin",100, 3, 7, 2, 2, 3);
    }
}
export class javali extends Inimigo {
    constructor() {
        super("javali", 100, 6, 7, 5, 0, 3);
    }
}
export class esqueleto extends Inimigo {
    constructor() {
        super("esqueleto", 100, 3, 4, 2, 0, 4);
    }
}

