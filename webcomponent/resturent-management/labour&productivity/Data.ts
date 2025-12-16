export interface DailyLaborProductivityData {
  date: string;
  laborHours: number;
  netSales: number;
  salesPerHour: number;
}

export interface LaborAnalysisData {
  totalLaborHours: number;
  totalNetSales: number;
  avgSalesPerHour: number;
  salesVsLaborChartData: {
    dates: string[];
    laborHours: number[];
    netSales: number[];
  };
  dailyLaborProductivity: DailyLaborProductivityData[];
}

export const laborAnalysisData: LaborAnalysisData = {
  totalLaborHours: 380,
  totalNetSales: 54780,
  avgSalesPerHour: 144.16,
  salesVsLaborChartData: {
    dates: [
      "2025-11-18", "2025-11-19", "2025-11-20", "2025-11-21", 
      "2025-11-22", "2025-11-23", "2025-11-24"
    ],
    laborHours: [52, 48, 54, 50, 56, 62, 56],
    netSales: [7250, 6890, 7580, 7120, 8450, 9280, 8210]
  },
  dailyLaborProductivity: [
    { date: "2025-11-18", laborHours: 52, netSales: 7250, salesPerHour: 139.42 },
    { date: "2025-11-19", laborHours: 48, netSales: 6890, salesPerHour: 143.54 },
    { date: "2025-11-20", laborHours: 54, netSales: 7580, salesPerHour: 140.37 },
    { date: "2025-11-21", laborHours: 50, netSales: 7120, salesPerHour: 142.40 },
    { date: "2025-11-22", laborHours: 56, netSales: 8450, salesPerHour: 145.69 },
    { date: "2025-11-23", laborHours: 62, netSales: 9280, salesPerHour: 149.68 },
    { date: "2025-11-24", laborHours: 56, netSales: 8210, salesPerHour: 146.61 }
  ]
};

