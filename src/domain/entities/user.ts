class User {
    id: number;
    planId?: number
    name: String;
    email: String;
    password: String;
    phone?: String;
    isActive?: Boolean;
    createdAt: Date;
    updatedAt: Date;


    constructor() {
        this.isActive = true;
        this.name = "Meu Perfil";
    }
}

export { User }