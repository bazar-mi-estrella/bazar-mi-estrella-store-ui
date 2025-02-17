import { OrderDetailPost } from "./orden-detail-post.interface";
import { OrderDetail } from "./orden-detail.interface";

export interface OrderDTO {
    id: string; // UUID como string
    firstname: string;
    lastname: string;
    clientFullname:string;
    clientEmail: string;
    phone: string;
    address: string;
    subtotal: number;
    igv:number;
    datecreate: string;
    total: number;
    distritoId: string; // UUID como string
    distritoProvinceId: string; // UUID como string
    distritoProvinceDepartmentId: string; // UUID como string
    code: string;
    numcode:number;
    stateId: string; // UUID como string
    stateName:string;
    statepagoId:string;
    datepreparation:string;
    paymentmethod:string;//Metodo de pago de la orden
    dateenvio:string;
    datedelivery:string;
    listdetails: OrderDetail[];
  }