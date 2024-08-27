export interface HeaderConfig <T> {
    fields : FieldValue<T>[],
    labels ?: { [K in keyof T] : string},
    filters : FilterValue[],
    sorts : SortValue[]
}

export interface FieldValue<T> {
    name : keyof T,
    type : string
}

interface FilterValue {
    field : string,
    value : string
}

interface SortValue {
    field : string,
    value : number
}
