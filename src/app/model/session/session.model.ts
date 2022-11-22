export class Session {
    public iduserIdentity !: number;
    public fullNameUserIdentity !: String;
    public nameUserIdentity !: String;
    public passUserIdentity !: String;
    public idTestingIdentity !: number;
    public stateTestingIdentity !: String;
    public tokenIdentity !: String;
    public puntuactionBloqueA !:number;
    public puntuactionBloqueB !:number;
    public majorBloqueA !:number;
    public majorBloqueC !:number;

    public puntuactionBloqueASectionA !:number;
    public puntuactionBloqueBSectionA !:number;
    public puntuactionBloqueCSectionA !:number;
    public puntuactionBloqueDSectionA !:number;
    public puntuactionBloqueESectionA !:number;
    public puntuactionBloqueFSectionA !:number;
    public puntuactionBloqueGSectionA !:number;
    public puntuactionBloqueHSectionA !:number;


    public puntuactionBloqueASectionB !:number;
    public puntuactionBloqueBSectionB !:number;
    public puntuactionBloqueCSectionB !:number;
    public puntuactionBloqueDSectionB !:number;
    public puntuactionBloqueESectionB !:number;
    public puntuactionBloqueFSectionB !:number;
    public puntuactionBloqueGSectionB !:number;
    public puntuactionBloqueHSectionB !:number;

    public puntuactionSectionA!:dataPuntuaction[];
    public puntuactionSectionB!:dataPuntuaction[];

    public idInteligence !: number;

    public dashboard !: boolean;
}


export class dataPuntuaction{
    public bloque!: String;
    public puntuaction !: number;
}