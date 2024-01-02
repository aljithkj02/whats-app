
export enum ChatType {
    CHAT = 'chat',
    ROOM = 'room',
    USERS = 'users',
}

export interface IChat {
    _id: string;
    owner: string;
    isGroup: boolean;
    members: {
        _id: string;
        name: string;
    }[]
}

export interface IMessage {
    _id: string;
    message: string;
    createdAt: Date;
    roomId: string;
    senderId: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
}