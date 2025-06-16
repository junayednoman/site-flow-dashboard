"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { yearOptions } from "@/data/global.data";
import { AFilterSelect } from "@/components/form/AFilterSelect";

const chartData = [
  { month: "Jan", value: 10.55 },
  { month: "Feb", value: 25 },
  { month: "Mar", value: 40 },
  { month: "Apr", value: 60 },
  { month: "May", value: 100.5 },
  { month: "Jun", value: 70 },
  { month: "Jul", value: 50 },
  { month: "Aug", value: 65 },
  { month: "Sep", value: 45 },
  { month: "Oct", value: 35 },
  { month: "Nov", value: 30 },
  { month: "Dec", value: 40 },
];

const chartConfig = {
  value: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function EarningOverview() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());
  const minValue = Math.min(...chartData.map((item) => item.value));
  const maxValue = Math.max(...chartData.map((item) => item.value));
  const yAxisDomain = [Math.floor(maxValue), Math.floor(minValue)];
  console.log("year", year);

  return (
    <div className="bg-card rounded-xl p-6 px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">
          Earning Overview
        </h1>
        <AFilterSelect
          onChange={setYear}
          placeholder={currentYear.toString()}
          value={year}
          options={yearOptions}
          className="!w-[100px]"
        />
      </div>
      <ChartContainer config={chartConfig} className="h-[320px] w-full mt-12">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            domain={yAxisDomain}
            stroke="#636566"
            tickLine={false}
            axisLine={false}
            tickMargin={20}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value) => (
                  <div className="flex items-center justify-between w-full">
                    <p className="text-muted-foreground font-medium">
                      Earnings:{" "}
                    </p>
                    <p>${value}</p>
                  </div>
                )}
              />
            }
          />
          <defs>
            <linearGradient id="fillEarnings" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-value)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-value)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="value"
            type="monotone"
            fill="url(#fillEarnings)"
            fillOpacity={0.4}
            stroke="var(--color-value)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
