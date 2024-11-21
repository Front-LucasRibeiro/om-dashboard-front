import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

type dataRow = {
  label: string;
  [key: string]: string | number;
};

interface BarChartDashProps {
  dataBody: dataRow[];
  maxWidth?: number;
  maxHeight?: number;
}

export function BarChartDash({
  dataBody,
  maxWidth = 800,
  maxHeight = 600,
}: BarChartDashProps) {
  const objectFields = Object.keys(dataBody[0]);
  const axisLabelKey = objectFields[0];

  const referenceFields = objectFields.filter((item) => item !== "label");

  const COLORS = Object.values(Colors);

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      maxHeight={maxHeight}
      style={{
        maxWidth: `${maxWidth}px`,
        fontFamily: Fonts.openSans,
        fontWeight: 600,
      }}
    >
      <BarChart width={maxWidth} height={maxHeight} data={dataBody}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey={axisLabelKey} />

        <YAxis />
        <Tooltip />
        <Legend />

        {referenceFields.map((item, index) => {
          return (
            <Bar
              key={index}
              dataKey={item}
              fill={COLORS[index]}
              radius={6}
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
