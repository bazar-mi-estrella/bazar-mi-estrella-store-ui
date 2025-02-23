export interface ProductFilter {
    name?:string;
    pricemin: number | null | undefined;
    pricemax: number | null | undefined;
    page: number;
    size: number;


}