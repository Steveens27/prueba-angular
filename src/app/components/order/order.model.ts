export interface Order {
    id: number
    cantidad_impuesto: string
    estado_logica: string
    idcategoria: number
    nro_pedido: number
    cliente: string
    fecha: string
    total_impuesto: number
    total: number
    sub_total: number
    cantidad_total: number
    estado: string
}

export interface DetailOrder {
    id?: number
    id_producto: number
    id_orden: number
    cantidad: number
    costo: number
}

export interface DetailOrderResponse {
    id?: number
    id_producto: number
    id_orden: number
    cantidad: number
    costo: number
    nombre:string
    precio_unitario:number
}