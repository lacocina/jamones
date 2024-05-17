export interface StatusInfo {
    text: string
    icon: string
}

export enum PackageStatusOptions {
    Opened = 'Opened',
    OnTheWay = 'OnTheWay',
    Pending = 'Pending',
    Closed = 'Closed',
}
