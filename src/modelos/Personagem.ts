//import sound from "sound-play";
import path from "path";
import { exec } from 'child_process';
import { DAOPersonagem } from "./DAOPersonagem.ts";


export abstract class Personagem implements DAOPersonagem{
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
    salvar(personagem: Personagem): void {
        throw new Error("Method not implemented.");
    }
    buscarPorId(id: number): Personagem | null {
        throw new Error("Method not implemented.");
    }
    listar(): Personagem[] {
        throw new Error("Method not implemented.");
    }

}

   







export class MusicPlayer {
    public isAtivo: boolean = false;
    private audioProcess: any = null;
    // Identificador único para este processo de áudio
    private readonly audioAlias = "C:\\Users\\LUCASCAMPELLOCARDOZO\\OneDrive - SenacRS\\2 SEM\\Programação orientada a objts - Quinta (Angelo)\\grupo\\musica.mp3";

    playMusic() {
        this.isAtivo = true;
        // 1. caminho da musica (precisa ser barras duplas, caso contrário o PowerShell se perde)
        const filePath = path.resolve("C:\\Users\\LUCASCAMPELLOCARDOZO\\OneDrive - SenacRS\\2 SEM\\Programação orientada a objts - Quinta (Angelo)\\grupo\\musica.mp3")

        // 2. Comando via PowerShell que carrega a biblioteca de áudio e toca no próprio terminal sem abrir janela em outro lugar.
        const playCmd = `powershell -Command "Add-Type -AssemblyName PresentationCore; $p = New-Object System.Windows.Media.MediaPlayer; $p.Open('${filePath}'); $p.Play(); while($true){Start-Sleep 1}"`;

        // 3. Executamos e armazenamos referência do processo
        this.audioProcess = exec(playCmd);
        console.log("\n🎵 Música iniciada! (Use a opção 6 para parar)");
    }

    stopMusic() {
        this.isAtivo = false;

        // Se temos referência do processo, matamos direto pelo PID
        if (this.audioProcess && this.audioProcess.pid) {
            try {
                // Mata o processo PowerShell filhando pelo PID
                exec(`taskkill /PID ${this.audioProcess.pid} /T /F`, (err) => {
                    if (!err) {
                        console.log(" Música interrompida. Terminal preservado.");
                    } else {
                        console.log(" Erro ao parar música, tentando método alternativo...");
                        // Alternativa: procura e mata todos os powershell.exe que rodam esse script específico
                        exec(`powershell -Command "Get-Process powershell | Where-Object {$_.CommandLine -like '*MediaPlayer*'} | Stop-Process -Force"`, (err2) => {
                            if (!err2) console.log(" Música parada com sucesso!");
                        });
                    }
                });
                this.audioProcess = null;
            } catch (e) {
                console.log(" Erro ao tentar parar a música");
            }
        } else {
            console.log("Nenhuma música está tocando");
        }
    }
}
//     stopMusic() {
//         this.isAtivo = false;

//         // TENTATIVA 1: Pelo objeto do processo (se o Node ainda tiver o controle)
//         if (this.currentProcess) {
//             try { this.currentProcess.kill(); } catch(e) {}
//         }

//         // TENTATIVA 2: "BOTÃO DE PÂNICO" (Força o Windows a fechar o player)
//         // O sound-play usa o PowerShell ou Media Player. Vamos matar os dois.
//         exec('taskkill /F /IM powershell.exe /T', (err) => {
//             // Se não era o powershell, tentamos o player padrão
//             exec('taskkill /F /IM wmplayer.exe /T');
//         });

//         this.currentProcess = null;
//         console.log("\n🛑 Comando de parada total enviado.");
//     }
let trocaestado: MusicPlayer | null = null;
const comando = "executar";