export interface IUserProps {
    onSubmit: (data: IUserData) => void;
}

export interface IUserData {
    idUser: string;
    name: string;
    email: string;
    age: string;
}
