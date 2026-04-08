'use client';

import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useStats } from '@/lib/hooks/useStats';
import Loader from '@/components/UI/Loader/Loader';
import Skeleton from '@/components/UI/Skeleton/Skeleton';
import styles from './TransactionsChart.module.css';

const generateUniqueRandomColors = (count: number) => {
  if (count === 0) return [];
  if (count === 1) return ['#0ebb69'];

  const steps = Array.from({ length: count }, (_, i) => i / (count - 1));

  for (let i = steps.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [steps[i], steps[j]] = [steps[j], steps[i]];
  }

  const r1 = 14,
    g1 = 187,
    b1 = 105; // #0ebb69
  const r2 = 250,
    g2 = 250,
    b2 = 250; // #fafafa

  return steps.map(t => {
    const r = Math.round(r1 + t * (r2 - r1));
    const g = Math.round(g1 + t * (g2 - g1));
    const b = Math.round(b1 + t * (b2 - b1));
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  });
};

export default function TransactionsChart() {
  const { data: stats, isLoading } = useStats();
  const [hoveredData, setHoveredData] = useState<{
    percentage: number;
    name: string;
    value: number;
  } | null>(null);

  const totalAmount = useMemo(() => {
    return stats?.reduce((acc, item) => acc + item.totalAmount, 0) ?? 0;
  }, [stats]);

  const processedStats = useMemo(() => {
    if (!stats || stats.length === 0 || totalAmount === 0) return [];

    let othersTotal = 0;
    const filteredStats: {
      _id: string;
      category: string;
      totalAmount: number;
    }[] = [];

    stats.forEach(item => {
      const percentage = (item.totalAmount / totalAmount) * 100;
      if (percentage < 1) {
        othersTotal += item.totalAmount;
      } else {
        filteredStats.push(item);
      }
    });

    if (othersTotal > 0) {
      filteredStats.push({
        _id: 'others',
        category: 'Others',
        totalAmount: Math.ceil(othersTotal < totalAmount * 0.01 ? totalAmount * 0.01 : othersTotal),
      });
    }

    return filteredStats;
  }, [stats, totalAmount]);

  const colorsList = useMemo(() => {
    if (!processedStats || processedStats.length === 0) return [];
    const colors = generateUniqueRandomColors(processedStats.length);
    return processedStats.map((item, index) => {
      if (item._id === 'others') {
        return 'rgba(250, 250, 250, 0.2)';
      }
      return colors[index];
    });
  }, [processedStats]);

  const chartData = useMemo(() => {
    if (!processedStats || processedStats.length === 0) return [];
    return processedStats.map(item => ({
      name: item.category,
      value: item.totalAmount,
    }));
  }, [processedStats]);

  const isEmpty = !processedStats || processedStats.length === 0;

  // Make cx equal to outerRadius so the left edge touches the container edge
  const cx = 130;
  const cy = 160;
  const innerRadius = 70;
  const outerRadius = 120;

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <div className={styles.skeletonChart}>
          <Skeleton width="100%" height={200} radius={16} />
          <div className={styles.skeletonList}>
            <Skeleton width="60%" height={12} />
            <Skeleton width="70%" height={12} />
            <Skeleton width="50%" height={12} />
            <Skeleton width="80%" height={12} />
          </div>
        </div>
      </div>
    );
  }

  // To make it look like the figma gauge half-pie chart:
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Expenses Categories</h2>

      <div className={styles.chartAndListWrapper}>
        <div
          className={styles.pieContainer}
          style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <PieChart width={260} height={200}>
            <Pie
              data={
                isEmpty
                  ? [{ name: 'Empty', value: 1 }]
                  : [...chartData].reverse()
              }
              cx={cx}
              cy={cy}
              startAngle={0}
              endAngle={180}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              stroke="none"
              cornerRadius={8}
              paddingAngle={isEmpty ? 0 : -10}
              onMouseEnter={data => {
                if (
                  !isEmpty &&
                  totalAmount > 0 &&
                  data &&
                  typeof data.value === 'number'
                ) {
                  setHoveredData({
                    percentage: Math.round((data.value / totalAmount) * 100),
                    name: data.name,
                    value: data.value,
                  });
                }
              }}
              onMouseLeave={() => setHoveredData(null)}
            >
              {isEmpty ? (
                <Cell fill="rgba(250, 250, 250, 0.2)" />
              ) : (
                [...chartData].reverse().map((entry, index) => {
                  const originalIndex = chartData.length - 1 - index;
                  return (
                    <Cell
                      key={`cell-${originalIndex}`}
                      fill={colorsList[originalIndex]}
                    />
                  );
                })
              )}
            </Pie>
          </PieChart>
          <div
            className={styles.totalOverlay}
            style={{ top: `${cy}px`, left: `${cx}px` }}
          >
            <span
              className={styles.totalValue}
              style={{ marginLeft: '10px', textAlign: 'center' }}
            >
              {isEmpty
                ? '0%'
                : hoveredData !== null
                  ? `${hoveredData.percentage}%`
                  : '100%'}
              {hoveredData && (
                <span
                  className={styles.totalLabel}
                  style={{ display: 'block', textTransform: 'none' }}
                >
                  {hoveredData.name}: {hoveredData.value}
                </span>
              )}
            </span>
          </div>
        </div>

        <div className={styles.resultsList}>
          {isEmpty ? (
            <p
              style={{
                color: 'rgba(250, 250, 250, 0.5)',
                marginTop: '20px',
                fontSize: '14px',
              }}
            >
              No transactions this month
            </p>
          ) : (
            processedStats.map((item, index) => {
              const percentage =
                totalAmount > 0
                  ? ((item.totalAmount / totalAmount) * 100).toFixed(0)
                  : 0;
              return (
                <div key={item._id} className={styles.categoryItem}>
                  <div className={styles.categoryInfo}>
                    <span
                      className={styles.marker}
                      style={{ backgroundColor: colorsList[index] }}
                    />
                    <span className={styles.categoryName}>{item.category}</span>
                  </div>
                  <span className={styles.percentage}>{percentage}%</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
