import { Inimigo } from "../Inimigo.ts";

export class esqueleto extends Inimigo {
    constructor() {
        super("esqueleto", 100, 3, 4, 4, 0, 4);
    }
}