type IReview = {
  user?: string;
  name: string;
  email: string;
  rating: number;
  review: string;
  date: string;
}

export interface ImagesProduc{
  codecolor:string;
  id:string;
  namecolor:string;
  urlimg:string;
}

export interface Descripaditionals{
  id:string;
  key:string;
  value:string;
}

export interface IProduct {
  id: string;
  marcaId?: string;
  marcaName?: string;
  modeloId?: string;
  modeloName?: string;
  name?: string;
  statusId?: string;
  stock?: number;
  typeId?: string;
  typeName: string;
  descuent?: number;
  imgurl?:string;
  images:ImagesProduc[];
  descripaditionals:Descripaditionals[];
  sku:string;
  code?:string;

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
  price: number;
  discount: number;
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
  description: string;
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
}