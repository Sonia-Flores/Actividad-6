import { IUser } from "./user";

export interface IAllUser {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    results: IUser[]
}
