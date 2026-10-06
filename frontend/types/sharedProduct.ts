export type SharedProduct = {
    _id: string;
    name: string;
    origin: string;
    flavorNotes: string[];
    price: number;
    available: boolean;
    description: string;
    processingMethod: string;
    brewingInstructions: string;
};