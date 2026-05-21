import { Inimigo } from "../Inimigo.ts";

export class goblin extends Inimigo {
    constructor() {
        super("goblin",100, 3, 7, 2, 2, 3);
    }
}