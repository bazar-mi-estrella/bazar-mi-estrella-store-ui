export interface ResponseDTO<T> {
    code: number; // Código de mensaje
    messageCode: string; // Código de catálogo de mensajes
    message: string; // Mensaje
    data: T; // Data
}