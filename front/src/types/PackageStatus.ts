export interface StatusInfo {
    text: string
    icon: string
}

export enum PackageStatusOptions {
    Opened = 'Abierto',
    OnTheWay = 'De camino',
    Pending = 'Pendiente de pago',
    Closed = 'Cerrado',
}
