import { supabase } from './supabaseClient';
import { Product, ProductCategory } from '../types';
import { MOCK_PRODUCTS } from '../constants';

export const getProducts = async (): Promise<Product[]> => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) {
            console.warn('Error fetching products from Supabase, falling back to mocks:', error.message);
            return MOCK_PRODUCTS;
        }

        if (!data || data.length === 0) {
            console.log('No products found in Supabase, utilizing MOCK_PRODUCTS.');
            return MOCK_PRODUCTS;
        }

        // Map Supabase snake_case to camelCase if necessary, or just return if they match.
        // Assuming the DB columns match the types for simplicity, or we map them.
        // Here we safely map them to ensure type safety.
        return data.map((item: any) => ({
            id: item.id.toString(),
            name: item.name,
            category: item.category as ProductCategory,
            price: Number(item.price),
            description: item.description,
            specs: item.specs,
            image: item.image
        }));

    } catch (err) {
        console.error('Unexpected error fetching products:', err);
        return MOCK_PRODUCTS;
    }
};
