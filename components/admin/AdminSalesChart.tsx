'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import Icon from '@/components/Icon';
import { salesHistory } from '@/lib/admin-data';
import { formatIDR } from '@/lib/format';
import styles from '@/components/admin/AdminSalesChart.module.css';

function formatSales(totalInMillions: number): string {
  return formatIDR(totalInMillions * 1_000_000);
}

export default function AdminSalesChart() {
  const years = useMemo(
    () => [...new Set(salesHistory.map((point) => point.year))].sort((a, b) => b - a),
    []
  );
  const [year, setYear] = useState(years[0]);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const yearData = salesHistory.filter((point) => point.year === year);
  const selectedPoint = selectedMonth === 'all'
    ? null
    : yearData.find((point) => point.monthIndex === Number(selectedMonth)) ?? null;

  const yearlyTotal = yearData.reduce((sum, point) => sum + point.total, 0);
  const yearlyOrders = yearData.reduce((sum, point) => sum + point.orders, 0);
  const average = Math.round(yearlyTotal / Math.max(yearData.length, 1));
  const bestMonth = yearData.reduce<(typeof yearData)[number] | null>(
    (best, point) => !best || point.total > best.total ? point : best,
    null
  );
  const maxValue = Math.max(...yearData.map((point) => point.total));
  const axisMax = Math.ceil(maxValue / 50) * 50;
  const axisValues = [axisMax, Math.round(axisMax * 0.75), Math.round(axisMax * 0.5), Math.round(axisMax * 0.25), 0];
  const allPoints = [...salesHistory].sort((a, b) => a.year - b.year || a.monthIndex - b.monthIndex);
  const selectedIndex = selectedPoint ? allPoints.findIndex((point) => point.year === selectedPoint.year && point.monthIndex === selectedPoint.monthIndex) : -1;
  const previousPoint = selectedIndex > 0 ? allPoints[selectedIndex - 1] : null;
  const change = selectedPoint && previousPoint
    ? ((selectedPoint.total - previousPoint.total) / previousPoint.total) * 100
    : null;

  function changeYear(nextYear: number) {
    setYear(nextYear);
    setSelectedMonth('all');
  }

  return (
    <section className={styles.card} aria-labelledby="sales-chart-title">
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Statistik penjualan</span>
          <h2 id="sales-chart-title">Penjualan bulanan</h2>
          <p>Pilih tahun atau bulan untuk membaca data lebih rinci.</p>
        </div>
        <div className={styles.filters}>
          <label>
            <span>Tahun</span>
            <select value={year} onChange={(event) => changeYear(Number(event.target.value))}>
              {years.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Bulan</span>
            <select value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)}>
              <option value="all">Semua bulan</option>
              {yearData.map((point) => <option key={point.monthIndex} value={point.monthIndex}>{point.month}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className={styles.summary}>
        <div>
          <span>{selectedPoint ? `${selectedPoint.month} ${year}` : `Total ${year}`}</span>
          <strong>{formatSales(selectedPoint?.total ?? yearlyTotal)}</strong>
        </div>
        <div>
          <span>Jumlah pesanan</span>
          <strong>{selectedPoint?.orders ?? yearlyOrders}</strong>
        </div>
        <div>
          <span>{selectedPoint ? 'Dari bulan sebelumnya' : 'Rata-rata per bulan'}</span>
          <strong className={change !== null && change < 0 ? styles.negative : styles.positive}>
            {selectedPoint && change !== null ? `${change >= 0 ? '+' : ''}${change.toFixed(1)}%` : formatSales(average)}
          </strong>
        </div>
        <div>
          <span>Bulan tertinggi</span>
          <strong>{bestMonth ? `${bestMonth.month} · ${formatSales(bestMonth.total)}` : 'Belum ada data'}</strong>
        </div>
      </div>

      <div className={styles.chartViewport}>
        <div className={styles.plot}>
          <div className={styles.grid} aria-hidden="true">
            {axisValues.map((value) => (
              <span key={value} className={styles.gridLine}><em>{value}</em></span>
            ))}
          </div>
          <div className={styles.bars} role="list" aria-label={`Penjualan bulanan tahun ${year}`}>
            {yearData.map((point) => {
              const height = Math.max(5, Math.round((point.total / axisMax) * 100));
              const active = selectedPoint?.monthIndex === point.monthIndex;
              return (
                <button
                  key={point.month}
                  type="button"
                  role="listitem"
                  className={`${styles.bar} ${active ? styles.selected : ''}`}
                  style={{ '--bar-height': `${height}%` } as CSSProperties}
                  aria-label={`${point.month} ${point.year}: ${formatSales(point.total)}, ${point.orders} pesanan`}
                  onClick={() => setSelectedMonth(String(point.monthIndex))}
                >
                  <span className={styles.tooltip}>
                    <strong>{point.month} {point.year}</strong>
                    <span>{formatSales(point.total)}</span>
                    <span>{point.orders} pesanan</span>
                  </span>
                  <span className={styles.barTrack}><span className={styles.barFill} /></span>
                  <span className={styles.barLabel}>{point.month}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className={styles.hint}><Icon name="compass" size={17} /> Arahkan kursor, fokuskan dengan keyboard, atau ketuk batang untuk melihat nilainya.</p>
    </section>
  );
}
