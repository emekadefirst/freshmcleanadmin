import { create } from 'zustand';
import { couponService } from '../services/couponService';

export const useCouponStore = create((set, get) => ({
  coupons: [],
  loading: false,
  error: null,
  initialized: false,

  fetchCoupons: async (force = false) => {
    const { initialized, coupons } = get();
    if (initialized && coupons.length > 0 && !force) {
      return;
    }
    
    set({ loading: true, error: null });
    try {
      const data = await couponService.getAll();
      set({ coupons: data, loading: false, initialized: true });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createCoupon: async (couponData) => {
    try {
      const newCoupon = await couponService.create(couponData);
      set(state => ({ coupons: [...state.coupons, newCoupon] }));
      return newCoupon;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateCoupon: async (id, couponData) => {
    try {
      const updatedCoupon = await couponService.update(id, couponData);
      set(state => ({
        coupons: state.coupons.map(coupon => coupon.id === id ? updatedCoupon : coupon)
      }));
      return updatedCoupon;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteCoupon: async (id) => {
    try {
      await couponService.delete(id);
      set(state => ({
        coupons: state.coupons.filter(coupon => coupon.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  }
}));