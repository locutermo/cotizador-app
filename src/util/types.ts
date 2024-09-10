type Option={
    label: string,
    value: string
}

type TourTable = {
    id?: number,
    created_at?: string,
    name:string,
    places_id : string,
    places?: DefaultTable
}

type TourObject = {
    id?: number,
    name: string,
    placeId: string,
    placeName?: string
}

type DefaultTable = {
    id?:number,
    name:string
}
