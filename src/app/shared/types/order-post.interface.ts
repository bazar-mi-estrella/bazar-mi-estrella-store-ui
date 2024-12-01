import { OrderDetailPost } from "./orden-detail-post.interface";

export interface OrderPostDTO {
    id: string; // UUID como string
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    distritoId: string; // UUID como string
    clientId: string; // UUID como string
    listdetails: OrderDetailPost[];
  }