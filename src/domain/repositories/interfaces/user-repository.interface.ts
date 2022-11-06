interface IUserRepository {
    create(data: UserDTO): Promise<UserDTO>
    findBy(where: any): Promise<UserDTO | undefined>
}

interface UserDTO {
    id?: number;
    planId?: number
    name?: String;
    email: String;
    password: String;
    phone?: String;
    isActive?: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export {
    IUserRepository,
    UserDTO
}