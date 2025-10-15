import { ValueTransformer } from 'typeorm';

/**
 * Transformer cho kiểu DECIMAL/NUMERIC trong database.
 * Khi đọc từ DB → parseFloat để trả về number.
 * Khi ghi vào DB → giữ nguyên number hoặc string.
 */
export const DecimalTransformer: ValueTransformer = {
  to: (value: number | null): number | null => {
    // Khi ghi vào DB
    return value === null || value === undefined ? null : value;
  },
  from: (value: string | null): number | null => {
    // Khi đọc từ DB
    return value === null ? null : parseFloat(value);
  },
};
