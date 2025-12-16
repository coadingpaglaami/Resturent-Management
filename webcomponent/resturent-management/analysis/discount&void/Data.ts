export interface ItemDiscountsVoids {
  item: string;
  discountAmount: number;
  voidCount: number;
  compCount: number;
  netSalesImpact: number;
}

export interface DiscountVoidsData {
  totalDiscounts: number;
  totalVoids: number;
  totalComps: number;
  totalImpact: number;
  itemsWithDiscountsVoids: ItemDiscountsVoids[];
}

export const discountVoidsData: DiscountVoidsData = {
  totalDiscounts: 803.0,
  totalVoids: 4,
  totalComps: 2,
  totalImpact: -911.0,
  itemsWithDiscountsVoids: [
    {
      item: "Ribeye Steak",
      discountAmount: 340.8,
      voidCount: 1,
      compCount: 1,
      netSalesImpact: -388.8,
    },
    {
      item: "Margherita Pizza",
      discountAmount: 196.0,
      voidCount: 2,
      compCount: 1,
      netSalesImpact: -244.0,
    },
    {
      item: "Pasta Carbonara",
      discountAmount: 147.4,
      voidCount: 0,
      compCount: 0,
      netSalesImpact: -147.4,
    },
    {
      item: "Caesar Salad",
      discountAmount: 118.8,
      voidCount: 1,
      compCount: 0,
      netSalesImpact: -130.8,
    },
  ],
};
