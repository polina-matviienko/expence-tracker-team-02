'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useStats } from '@/lib/hooks/useStatsFixed';

import styles from './TransactionsChart.module.css';

const COLORS = ['#00D27F', '#2E9685', '#88D27F'];


export default function TransactionsChart() {
  const { data: stats, isLoading } = useStats();

  const totalAmount = useMemo(() => {
    return stats?.reduce((acc, item) => acc + item.totalAmount, 0) ?? 0;
  }, [stats]);

  const chartData = useMemo(() => {
    // If stats is empty or uninitialized, provide an empty state to prevent crash
    if (!stats || stats.length === 0) return [{ name: 'No data', value: 1 }];
    return stats.map((item) => ({
      name: item.category,
      value: item.totalAmount,
    }));
  }, [stats]);

  // We will use a wrapper with flexbox to center a fixed-size PieChart to make needle math reliable
  const cx = 150;
  const cy = 160;
  const innerRadius = 90;
  const outerRadius = 120;

  if (isLoading) {
    return <div className={styles.loader}>Loading chart...</div>;
  }

  // To make it look like the figma gauge half-pie chart:
  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <h2 className={styles.title}>Expenses Categories</h2>
        <div className={styles.pieContainer} style={{ display: 'flex', justifyContent: 'center' }}>
          <PieChart width={300} height={200}>
            <Pie
              data={[...chartData].reverse()}
              cx={cx}
              cy={cy}
              startAngle={0}
              endAngle={180}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              stroke="none"
              cornerRadius={8}
              paddingAngle={-10}
            >
              {[...chartData].reverse().map((entry, index) => {
                const originalIndex = chartData.length - 1 - index;
                return (
                  <Cell 
                    key={`cell-${originalIndex}`} 
                    fill={COLORS[originalIndex % COLORS.length]} 
                  />
                );
              })}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#191919', 
                border: 'none',
                borderRadius: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: '#fff' }}
            />

          </PieChart>
          <div className={styles.totalOverlay} style={{ top: '150px' }}>
            <span className={styles.totalValue}>100%</span>
          </div>
        </div>
      </div>

      <div className={styles.resultsList}>
        {stats?.map((item, index) => {
          const percentage = totalAmount > 0 
            ? ((item.totalAmount / totalAmount) * 100).toFixed(0) 
            : 0;
          return (
            <div key={item._id} className={styles.categoryItem}>
              <div className={styles.categoryInfo}>
                <span 
                  className={styles.marker} 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className={styles.categoryName}>{item.category}</span>
              </div>
              <span className={styles.percentage}>{percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
