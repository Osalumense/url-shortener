export interface UserInputDTO {
    id?: number;
    uuid: string;
    firstName: string;
    lastName: string;
    phone?: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}
