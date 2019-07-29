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