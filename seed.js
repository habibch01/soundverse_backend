import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
    { id: 1, name: "Apple AirPods Pro (2nd Gen)", brand: "Apple", price: 249, oldPrice: 299, category: "AirPods", rating: 4.8, reviews: 1245, imageInitial: "AP", image: "/airpods_pro_2.png", color: "White" },
    { id: 2, name: "Sony WH-1000XM5", brand: "Sony", price: 349, oldPrice: 399, category: "Over-Ear", rating: 4.9, reviews: 892, imageInitial: "S5", image: "/sony_wh1000xm5.png", color: "Black" },
    { id: 3, name: "Samsung Galaxy Buds 2 Pro", brand: "Samsung", price: 229, oldPrice: 259, category: "Earbuds", rating: 4.6, reviews: 456, imageInitial: "GB", image: "/galaxy_buds_2.png", color: "Graphite" },
    { id: 4, name: "Bose QuietComfort 45", brand: "Bose", price: 329, oldPrice: 379, category: "Over-Ear", rating: 4.7, reviews: 673, imageInitial: "QC", image: "/bose_qc45.png", color: "Triple Black" },
    { id: 5, name: "JBL Tune 760NC", brand: "JBL", price: 99, oldPrice: 129, category: "Over-Ear", rating: 4.4, reviews: 342, imageInitial: "T7", image: "/jbl_tune_760nc.png", color: "Blue" },
    { id: 6, name: "Apple AirPods (3rd Gen)", brand: "Apple", price: 179, oldPrice: 199, category: "AirPods", rating: 4.5, reviews: 890, imageInitial: "A3", image: "/airpods_pro_2.png", color: "White" },
    { id: 7, name: "Sennheiser Momentum 4", brand: "Sennheiser", price: 379, oldPrice: 429, category: "Over-Ear", rating: 4.8, reviews: 231, imageInitial: "M4", image: "/sennheiser_momentum_4.png", color: "Copper" },
    { id: 8, name: "Jabra Elite 85t", brand: "Jabra", price: 199, oldPrice: 229, category: "Earbuds", rating: 4.3, reviews: 567, imageInitial: "85", image: "/galaxy_buds_2.png", color: "Titanium" },
    { id: 9, name: "Beats Studio Pro", brand: "Beats", price: 349, oldPrice: 399, category: "Over-Ear", rating: 4.6, reviews: 432, imageInitial: "SP", image: "/sony_wh1000xm5.png", color: "Deep Brown" },
    { id: 10, name: "Sony WF-1000XM5", brand: "Sony", price: 299, oldPrice: 349, category: "Earbuds", rating: 4.7, reviews: 312, imageInitial: "W5", image: "/sony_wh1000xm5.png", color: "Silver" },
    { id: 11, name: "Samsung Galaxy Buds Live", brand: "Samsung", price: 149, oldPrice: 179, category: "Earbuds", rating: 4.2, reviews: 899, imageInitial: "GL", image: "/galaxy_buds_2.png", color: "Mystic Bronze" },
    { id: 12, name: "JBL Quantum 800", brand: "JBL", price: 149, oldPrice: 199, category: "Gaming", rating: 4.5, reviews: 245, imageInitial: "Q8", image: "/jbl_tune_760nc.png", color: "Black" }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/soundverse');
        console.log('Connected to MongoDB for seeding');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        await Product.insertMany(products);
        console.log('Product data seeded successfully');

        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
