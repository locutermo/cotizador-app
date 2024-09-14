type Option={
    label: string,
    value: string
}

type TourTable = {
    id?: number,
    created_at?: string,
    name:string,
    places_id : string,
    places?: DefaultTable,
    kidPrice:number,
    adultPrice: number,
}

type TourObject = {
    id?: number,
    name: string,
    placeId: string,
    placeName?: string,
    kidPrice:number,
    adultPrice:number
}

type DefaultTable = {
    id?:number,
    name:string
}
