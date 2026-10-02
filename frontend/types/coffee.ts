export type Coffee = {
    _id: string;
    name: string;
    origin: string;
    roastLevel: string;
    flavorNotes: string[];
    price: number;
    available: boolean;
    image: {
        asset: {
            _id: string;
            url: string;
        }
    };
};