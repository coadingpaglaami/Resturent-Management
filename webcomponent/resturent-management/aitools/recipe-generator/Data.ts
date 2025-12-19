export interface RecpieGeneratorTable {
    id: number;
    productName: string;
    category:string;
    unit:string;
    currentPriceperUnit:number;
    costPerOz:number;
    quantity?:number;
}

export interface RecipieGeneratorData{
    id:number;
    ingredientName:string;
    matchedProductName:string;
    matchPercentage:number;
    aiAmount:string;
    convertedAmount:string;
}