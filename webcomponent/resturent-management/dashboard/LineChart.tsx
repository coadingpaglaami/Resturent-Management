export interface LineChartProps {
  months: string;
  sales: number;
  cogs: number;
}
export const LineChart = ({ data }: { data: LineChartProps[] }) => {
  return <div>LineChart</div>;
};