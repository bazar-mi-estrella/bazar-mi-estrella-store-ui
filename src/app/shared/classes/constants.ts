/**
 *Class Constants
 *
 * @export
 * @class Constants
 */
export class Constants {

    //ESTADOS DE ORDENES (prefijo 5)
    public static ESTADO_GENERADO:string = '57eca91c-ba22-4e0c-864e-3bd2f476f8cc' // ESTADO_GENERADO
    public static ESTADO_PREPARANDO_ENVIO:string = '91b0c3af-e133-4ea4-9128-771ee336345f' // ESTADO_PREPARANDO_ENVIO
    public static ESTADO_EN_TRANSITO:string = '466c94c7-09d2-4a60-9d54-f6151a2f586a' // ESTADO_EN_TRANSITO
    public static ESTADO_ENTREGADO:string = 'ab2e325c-0fd1-4279-a17f-d7eb66ca9cf0' // ESTADO_ENTREGADO
    public static ESTADO_DEVUELTO:string = '90689b03-6f47-4acb-8e79-5146d931b646' // ESTADO_DEVUELTO

    //ESTADOS DE PAGO DE ORDENES (prefijo 8)
    public static ESTADO_PAGO_POR_PAGAR:string = '71b16791-a4f5-4a6d-a4e0-12f0b66961c9' // ESTADO_PAGO_POR_PAGAR
    public static ESTADO_PAGO_PAGADO:string = '319bb655-9580-41fe-aaa1-960fe2db32c1' // ESTADO_PAGO_PAGADO

    public static HTTP_STATUS_CORRECT:number = 1;
    public static HTTP_STATUS_VALIDATE:number = 0;
    public static EMAIL_COMPANY:string = 'cixtechmart@gmail.com';


    public static UUID_DEPARTAMENT_LAMBAYEQUE:string = '5de76549-55f8-48fb-91c2-900c2db4fed1';

    //Ids de distritos con envio gratis
    public static LIST_DIST_SEND_FREE:string[]=[
        'e0552c2b-c59c-461f-8833-d17d466a5a10',//Ferreñafe
        'bcf8da95-aa77-4aa1-8132-e54f17f9700c', //Lambayeque
        '0f3175e3-4c5d-4e14-9552-0d8e91a24519'
    ]
    
}
