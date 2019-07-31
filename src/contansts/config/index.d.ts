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
