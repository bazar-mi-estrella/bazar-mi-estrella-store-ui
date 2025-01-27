import { OrderDetailPost } from "./orden-detail-post.interface";

export interface OrderTrayDTO {
    id: string; // UUID como string
    code: string;
    personfullname: string;
    igv:number;
    subtotal: number;
    total: number;
    stateId: string; // UUID como string
    stateName:string;
    statepagoId:string;
    statepagoName:string;
    datecreate:string;
  }