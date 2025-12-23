export interface Vendor {
  id: string;
  name: string;
  contactInfo: string;
  lastOrderGuideImport: string;
  sku: number;
  orderGuideItems: orderGuideItems[];
}

export interface orderGuideItems {
  sku: string;
  priceHistory: priceHistory;
  packSize: number;
  unitType: string;
  pricePack: number;
  costPerUnit: number;
  linkedIngredient: string;
  lastUpdated: string;
  category?: string;
}
export interface priceHistory {
  productName: string;
  history: {
    date: string;
    price: number;
  }[];
}

export interface Vendor {
  name: string;
  contactInfo: string;
  lastOrderGuideImport: string;
  sku: number;
  orderGuideItems: orderGuideItems[];
}

export interface orderGuideItems {
  sku: string;
  priceHistory: priceHistory;
  packSize: number;
  unitType: string;
  pricePack: number;
  costPerUnit: number;
  linkedIngredient: string;
  lastUpdated: string;
}

export interface priceHistory {
  productName: string;
  history: {
    date: string;
    price: number;
  }[];
}

export const vendors: Vendor[] = [
  {
    id: "1",
    name: "Sysco Foods",
    contactInfo: "orders@sysco.com",
    lastOrderGuideImport: "2025-11-20",
    sku: 145,
    orderGuideItems: [
      {
        sku: "MT-045",
        priceHistory: {
          productName: "Ribeye Steak",
          history: [
            { date: "2025-10-15", price: 145.0 },
            { date: "2025-10-22", price: 146.0 },
            { date: "2025-10-29", price: 145.5 },
            { date: "2025-11-05", price: 144.0 },
            { date: "2025-11-12", price: 145.0 },
          ],
        },
        packSize: 10,
        unitType: "LB",
        pricePack: 145.0,
        costPerUnit: 14.5,
        linkedIngredient: "Ribeye Steak",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "MT-046",
        priceHistory: {
          productName: "Filet Mignon",
          history: [
            { date: "2025-10-15", price: 225.0 },
            { date: "2025-10-22", price: 226.0 },
            { date: "2025-10-29", price: 225.5 },
            { date: "2025-11-05", price: 224.0 },
            { date: "2025-11-12", price: 225.0 },
          ],
        },
        packSize: 8,
        unitType: "LB",
        pricePack: 225.0,
        costPerUnit: 22.5,
        linkedIngredient: "Filet Mignon",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "MT-047",
        priceHistory: {
          productName: "T-Bone Steak",
          history: [
            { date: "2025-10-15", price: 175.0 },
            { date: "2025-10-22", price: 176.0 },
            { date: "2025-10-29", price: 175.5 },
            { date: "2025-11-05", price: 174.0 },
            { date: "2025-11-12", price: 175.0 },
          ],
        },
        packSize: 10,
        unitType: "LB",
        pricePack: 175.0,
        costPerUnit: 17.5,
        linkedIngredient: "T-Bone Steak",
        lastUpdated: "2025-11-20",
      },
    ],
  },
  {
    id: "2",
    name: "US Foods",
    contactInfo: "sales@usfoods.com",
    lastOrderGuideImport: "2025-11-18",
    sku: 98,
    orderGuideItems: [
      {
        sku: "SF-012",
        priceHistory: {
          productName: "Atlantic Salmon",
          history: [
            { date: "2025-10-15", price: 96.0 },
            { date: "2025-10-22", price: 97.0 },
            { date: "2025-10-29", price: 96.5 },
            { date: "2025-11-05", price: 95.0 },
            { date: "2025-11-12", price: 96.0 },
          ],
        },
        packSize: 8,
        unitType: "LB",
        pricePack: 96.0,
        costPerUnit: 12.0,
        linkedIngredient: "Atlantic Salmon",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "SF-013",
        priceHistory: {
          productName: "Tilapia",
          history: [
            { date: "2025-10-15", price: 50.0 },
            { date: "2025-10-22", price: 51.0 },
            { date: "2025-10-29", price: 50.5 },
            { date: "2025-11-05", price: 49.0 },
            { date: "2025-11-12", price: 50.0 },
          ],
        },
        packSize: 10,
        unitType: "LB",
        pricePack: 50.0,
        costPerUnit: 5.0,
        linkedIngredient: "Tilapia",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "SF-014",
        priceHistory: {
          productName: "Shrimp",
          history: [
            { date: "2025-10-15", price: 120.0 },
            { date: "2025-10-22", price: 121.0 },
            { date: "2025-10-29", price: 120.5 },
            { date: "2025-11-05", price: 119.0 },
            { date: "2025-11-12", price: 120.0 },
          ],
        },
        packSize: 8,
        unitType: "LB",
        pricePack: 120.0,
        costPerUnit: 15.0,
        linkedIngredient: "Shrimp",
        lastUpdated: "2025-11-20",
      },
    ],
  },
  {
    id: "3",
    name: "Restaurant Depot",
    contactInfo: "support@restaurantdepot.com",
    lastOrderGuideImport: "2025-11-15",
    sku: 67,
    orderGuideItems: [
      {
        sku: "PR-028",
        priceHistory: {
          productName: "Roma Tomatoes",
          history: [
            { date: "2025-10-15", price: 46.25 },
            { date: "2025-10-22", price: 46.5 },
            { date: "2025-10-29", price: 46.1 },
            { date: "2025-11-05", price: 46.0 },
            { date: "2025-11-12", price: 46.25 },
          ],
        },
        packSize: 25,
        unitType: "LB",
        pricePack: 46.25,
        costPerUnit: 1.85,
        linkedIngredient: "Roma Tomatoes",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "PR-029",
        priceHistory: {
          productName: "Green Bell Peppers",
          history: [
            { date: "2025-10-15", price: 30.0 },
            { date: "2025-10-22", price: 30.5 },
            { date: "2025-10-29", price: 30.25 },
            { date: "2025-11-05", price: 29.75 },
            { date: "2025-11-12", price: 30.0 },
          ],
        },
        packSize: 10,
        unitType: "LB",
        pricePack: 30.0,
        costPerUnit: 2.0,
        linkedIngredient: "Green Bell Peppers",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "PR-030",
        priceHistory: {
          productName: "Cucumbers",
          history: [
            { date: "2025-10-15", price: 25.0 },
            { date: "2025-10-22", price: 25.5 },
            { date: "2025-10-29", price: 25.25 },
            { date: "2025-11-05", price: 25.0 },
            { date: "2025-11-12", price: 25.25 },
          ],
        },
        packSize: 12,
        unitType: "LB",
        pricePack: 25.0,
        costPerUnit: 2.5,
        linkedIngredient: "Cucumbers",
        lastUpdated: "2025-11-20",
      },
    ],
  },
  {
    id: "4",
    name: "Fresh Farms",
    contactInfo: "info@freshfarms.com",
    lastOrderGuideImport: "2025-11-20",
    sku: 120,
    orderGuideItems: [
      {
        sku: "FF-045",
        priceHistory: {
          productName: "Pineapple",
          history: [
            { date: "2025-10-15", price: 5.0 },
            { date: "2025-10-22", price: 5.5 },
            { date: "2025-10-29", price: 5.25 },
            { date: "2025-11-05", price: 5.0 },
            { date: "2025-11-12", price: 5.1 },
          ],
        },
        packSize: 1,
        unitType: "Each",
        pricePack: 5.0,
        costPerUnit: 3.5,
        linkedIngredient: "Pineapple",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "FF-046",
        priceHistory: {
          productName: "Banana",
          history: [
            { date: "2025-10-15", price: 1.5 },
            { date: "2025-10-22", price: 1.55 },
            { date: "2025-10-29", price: 1.52 },
            { date: "2025-11-05", price: 1.5 },
            { date: "2025-11-12", price: 1.52 },
          ],
        },
        packSize: 1,
        unitType: "Each",
        pricePack: 1.5,
        costPerUnit: 1.2,
        linkedIngredient: "Banana",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "FF-047",
        priceHistory: {
          productName: "Mango",
          history: [
            { date: "2025-10-15", price: 2.0 },
            { date: "2025-10-22", price: 2.1 },
            { date: "2025-10-29", price: 2.05 },
            { date: "2025-11-05", price: 2.0 },
            { date: "2025-11-12", price: 2.1 },
          ],
        },
        packSize: 1,
        unitType: "Each",
        pricePack: 2.0,
        costPerUnit: 1.5,
        linkedIngredient: "Mango",
        lastUpdated: "2025-11-20",
      },
    ],
  },
  {
    id: "5",
    name: "Ocean Fresh",
    contactInfo: "sales@oceanfresh.com",
    lastOrderGuideImport: "2025-11-20",
    sku: 89,
    orderGuideItems: [
      {
        sku: "OF-010",
        priceHistory: {
          productName: "Cod Fish",
          history: [
            { date: "2025-10-15", price: 25.0 },
            { date: "2025-10-22", price: 26.0 },
            { date: "2025-10-29", price: 25.5 },
            { date: "2025-11-05", price: 24.75 },
            { date: "2025-11-12", price: 25.0 },
          ],
        },
        packSize: 15,
        unitType: "LB",
        pricePack: 25.0,
        costPerUnit: 10.0,
        linkedIngredient: "Cod Fish",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "OF-011",
        priceHistory: {
          productName: "Halibut",
          history: [
            { date: "2025-10-15", price: 30.0 },
            { date: "2025-10-22", price: 31.0 },
            { date: "2025-10-29", price: 30.5 },
            { date: "2025-11-05", price: 29.75 },
            { date: "2025-11-12", price: 30.0 },
          ],
        },
        packSize: 12,
        unitType: "LB",
        pricePack: 30.0,
        costPerUnit: 12.0,
        linkedIngredient: "Halibut",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "OF-012",
        priceHistory: {
          productName: "Salmon",
          history: [
            { date: "2025-10-15", price: 40.0 },
            { date: "2025-10-22", price: 41.0 },
            { date: "2025-10-29", price: 40.5 },
            { date: "2025-11-05", price: 39.75 },
            { date: "2025-11-12", price: 40.0 },
          ],
        },
        packSize: 10,
        unitType: "LB",
        pricePack: 40.0,
        costPerUnit: 16.0,
        linkedIngredient: "Salmon",
        lastUpdated: "2025-11-20",
      },
    ],
  },
  {
    id: "6",
    name: "Grocery Hub",
    contactInfo: "info@groceryhub.com",
    lastOrderGuideImport: "2025-11-18",
    sku: 72,
    orderGuideItems: [
      {
        sku: "GH-012",
        priceHistory: {
          productName: "Carrots",
          history: [
            { date: "2025-10-15", price: 12.0 },
            { date: "2025-10-22", price: 12.5 },
            { date: "2025-10-29", price: 12.25 },
            { date: "2025-11-05", price: 12.0 },
            { date: "2025-11-12", price: 12.25 },
          ],
        },
        packSize: 10,
        unitType: "LB",
        pricePack: 12.0,
        costPerUnit: 1.0,
        linkedIngredient: "Carrots",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "GH-013",
        priceHistory: {
          productName: "Cabbage",
          history: [
            { date: "2025-10-15", price: 9.0 },
            { date: "2025-10-22", price: 9.5 },
            { date: "2025-10-29", price: 9.25 },
            { date: "2025-11-05", price: 9.0 },
            { date: "2025-11-12", price: 9.1 },
          ],
        },
        packSize: 8,
        unitType: "LB",
        pricePack: 9.0,
        costPerUnit: 3.0,
        linkedIngredient: "Cabbage",
        lastUpdated: "2025-11-20",
      },
      {
        sku: "GH-014",
        priceHistory: {
          productName: "Spinach",
          history: [
            { date: "2025-10-15", price: 7.0 },
            { date: "2025-10-22", price: 7.5 },
            { date: "2025-10-29", price: 7.25 },
            { date: "2025-11-05", price: 7.0 },
            { date: "2025-11-12", price: 7.25 },
          ],
        },
        packSize: 6,
        unitType: "LB",
        pricePack: 7.0,
        costPerUnit: 2.5,
        linkedIngredient: "Spinach",
        lastUpdated: "2025-11-20",
      },
    ],
  },
];
