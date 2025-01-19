import { OrderDetailPost } from "./orden-detail-post.interface";

export interface OrderDTO {
    id: string; // UUID como string
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    subtotal: number;
    igv:number;
    total: number;
    distritoId: string; // UUID como string
    distritoProvinceId: string; // UUID como string
    distritoProvinceDepartmentId: string; // UUID como string
    code: string;
    stateId: string; // UUID como string
    stateName:string;
    datepreparation:string;
    dateenvio:string;
    datedelivery:string;
    listdetails: OrderDetailPost[];
  }