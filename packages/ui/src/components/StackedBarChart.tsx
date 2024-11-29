import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { useState } from "react";

import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import { Collection, dataRow, Format } from '../types';
import { format } from '../helpers/format';

type Styles = {
  barSize: number
  legend: boolean;
  stackId: string
}
interface StackedBarDashProps {
  dataBody: dataRow[];
  maxWidth?: number;
  maxHeight?: number;
  colorCollection?: Collection | null;
  styles: Styles
  formatValue: Format,
  hoverColors: Collection | null;
}

export function StackedBarDash({
  dataBody,
  maxWidth = 800,
  maxHeight = 600,
  colorCollection = null,
  styles,
  formatValue,
  hoverColors,
}: StackedBarDashProps) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const objectFields = dataBody && dataBody[0] ? Object.keys(dataBody[0]) : [];

  const referenceFields = objectFields.filter((item) => item !== "label");

  const COLORS =
    colorCollection === null
      ? Object.values(Colors)
      : Object.values(colorCollection);

  const HOVER_COLORS =
    hoverColors === null
      ? COLORS.map((color) => `${color}CC`)
      : Object.values(hoverColors);

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
        <XAxis dataKey="name" />
        <YAxis type="number"
          tickFormatter={(value) => format(value as number, formatValue)}
        />
        <Tooltip
          formatter={(value) => format(value as number, formatValue)}
        />
        {styles.legend && <Legend />}

        {referenceFields.map((item, index) => (
          <Bar
            key={index}
            stackId={styles.stackId}
            dataKey={item}
            fill={hoveredBar === item ? HOVER_COLORS[index] : COLORS[index]}
            maxBarSize={styles.barSize}
            onMouseOver={() => setHoveredBar(item)}
            onMouseOut={() => setHoveredBar(null)}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
