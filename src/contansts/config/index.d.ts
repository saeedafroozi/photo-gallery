interface Category {
    id: number;
    name: string;
}
interface Image {
    breeds: any;
    categories: Category[];
    height: number;
    id: string;
    url: string;
    width: number;
}
interface ITransportLayer {
    getServerData(url: string, type: FetchType): Promise<ResponseResult>
}
interface ResponseResult {
    images?: Image[];
    categories?: Category[];
    total?: number;
    selectedCategory?:number
}
interface Action {
    type: string;
    payload: ContentState;
}
interface ContentState {
    categories?: Category[];
    selectedCategory?: number;
    images?: Image[];
    isLoading?: boolean;
    total?: number;
    pageIndex?: number;
}
