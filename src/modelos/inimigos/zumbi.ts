import { Inimigo } from  "../Inimigo.ts";


export class zumbi extends Inimigo {
    constructor() {
        super("zumbi", 100, 4, 3, 5, 0, 3);
        //this.hiv = 0.05* 100;
        
    }
}