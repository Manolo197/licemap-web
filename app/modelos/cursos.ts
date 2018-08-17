export class Cursos
{
    constructor(
        public _id: string,
        public nombre: string,
        public description: string,
        public temas:[string]
    )
    {}
}