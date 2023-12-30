
export enum ChatType {
    CHAT = 'chat',
    ROOM = 'room',
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