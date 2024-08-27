import { HeaderConfig } from "./Header-config";

export interface TableConfig<T> {
    tools : string,
    header : HeaderConfig<T>
}
