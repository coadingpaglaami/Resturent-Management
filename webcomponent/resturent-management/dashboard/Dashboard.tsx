import {
  Card,
  CardProps,
  Heading,
  Varience,
  VarienceProps,
} from "@/webcomponent/reusable";
import { LineChart, LineChartProps } from "./LineChart";
import { TopSellingMenuItems, TopSellingMenuItemsProps } from "./BarChart";
import {
  lineChartData,
  topSellingMenuItems,
  cardData,
  varienceProps,
} from "./data";

interface DashboardProps {
  lineChartData: LineChartProps[];
  topSellingMenuItems: TopSellingMenuItemsProps[];
  cardData: CardProps[];
  varienceProps: VarienceProps[];
}

export const Dashboard = () => {
  const dashboardData: DashboardProps = {
    lineChartData,
    topSellingMenuItems,
    cardData,
    varienceProps,
  };
  return (
    <div className="flex flex-col gap-4 ">
      <Heading
        title="Dashboard"
        subtitle="Welcome to your restaurant management dashboard"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {dashboardData.cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full md:items-stretch">
        <div className="flex-1">
          <LineChart data={dashboardData.lineChartData} />
        </div>
        <div className="flex-1">
          <TopSellingMenuItems data={dashboardData.topSellingMenuItems} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {/* Render Varience components here using varienceProps */}
        {dashboardData.varienceProps.map((variance, index) => (
          <Varience key={index} {...variance} />
        ))}
      </div>
    </div>
  );
};
