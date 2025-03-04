export interface IUser{
    id?:number
    name:string
    surname:string
    login:string
    password:string
    picture?:string
    cover?:string
    followers?:IUser[]
    following?:IUser[]
    isPrivate?:number
    old:string
    newpwd:string
}

export interface IResponse{
    status:string
    message?:string
    user?:IUser
    payload:unknown
}

export type PartialUser = Partial<IUser>

export interface IPost{
    id:number
    title:string
    picture:string
    likes:IUser[]
}

