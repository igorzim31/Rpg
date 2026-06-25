import { Inimigo } from "../Inimigo";


export class serpente extends Inimigo {
    constructor() {
        super("serpente", 100, 5, 8, 4, 0, 2, 5);
        //this.veneno = 0.05 * this._vida
    }
}