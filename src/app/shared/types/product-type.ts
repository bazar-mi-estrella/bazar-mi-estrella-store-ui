type IReview = {
  user?: string;
  name: string;
  email: string;
  rating: number;
  review: string;
  date: string;
}

export interface ImagesProduc {
  codecolor: string;
  id: string;
  namecolor: string;
  urlimg: string;
}

export interface Descripaditionals {
  id: string;
  key: string;
  value: string;
}

export interface IProduct {

  img: string;
  title: string;
  slug: string;
  unit: string;
  imageURLs: {
    color?: {
      name: string;
      clrCode: string;
    };
    img: string;
  }[];
  parent: string;
  children: string;
  quantity: number;
  brand: {
    name: string;
  };
  category: {
    name: string;
  };
  status: string;
  reviews?: IReview[];
  productType: string;
  orderQuantity?: number;
  additionalInformation: {
    key: string;
    value: string;
  }[];
  featured?: boolean;
  sellCount: number;
  offerDate?: {
    startDate: string;
    endDate: string;
  }
  tags?: string[];
  videoId?: string;
  sizes?: string[];

  descuent?: number;
  sku: string;
  code?: string;



  //Campos que si vienen del backend
  id: string;
  datecreate?:string;
  dateofferend?: string;//Fecha fin de oferta
  discount: number;//Descuento por la oferta
  datepublication?:string;
  description: string;
  descripaditionals: Descripaditionals[];
  images: ImagesProduc[];
  imgurl?: string;
  marcaId?: string;
  marcaName?: string;
  modeloId?: string;
  modeloName?: string;
  typeId?: string;
  typeName: string;
  name?: string;
  price: number;
  statusId?: string;
  stock?: number;



}