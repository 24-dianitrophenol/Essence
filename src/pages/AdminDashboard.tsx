import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Bell, DollarSign, Plus, Edit2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}

interface Notification {
    _id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: string;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'products' | 'notifications'>('products');
    const [products, setProducts] = useState<Product[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchProducts();
        fetchNotifications();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
    };

    const fetchNotifications = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/notifications', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setNotifications(data);
    };

    const handleDeleteProduct = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchProducts();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold text-[#f98203]">Essence Admin</h1>
                    <p className="text-xs text-gray-500 mt-1">Store Management System</p>
                </div>

                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-[#f98203] text-white shadow-lg shadow-[#f98203]/20' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Package size={20} />
                        <span className="font-semibold">Products</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'notifications' ? 'bg-[#f98203] text-white shadow-lg shadow-[#f98203]/20' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Bell size={20} />
                        <span className="font-semibold">Notifications</span>
                        {notifications.filter(n => !n.read).length > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                {notifications.filter(n => !n.read).length}
                            </span>
                        )}
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-10">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            {activeTab === 'products' ? 'Product Management' : 'Notification Center'}
                        </h2>
                        <p className="text-gray-500">Welcome back, {user?.name || 'Admin'}</p>
                    </div>
                    {activeTab === 'products' && (
                        <button
                            onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                            className="bg-[#f98203] text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-[#e07502] transition-all shadow-lg shadow-[#f98203]/20"
                        >
                            <Plus size={20} />
                            <span>Add New Product</span>
                        </button>
                    )}
                </header>

                {activeTab === 'products' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <motion.div
                                layout
                                key={product._id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                            >
                                <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-50">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h3>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[#f98203] font-bold text-xl">${product.price.toFixed(2)}</span>
                                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.stock} in stock</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                                        className="flex-1 flex justify-center items-center space-x-2 py-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <Edit2 size={16} />
                                        <span className="text-sm font-semibold">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product._id)}
                                        className="flex-1 flex justify-center items-center space-x-2 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                        <span className="text-sm font-semibold">Delete</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="divide-y divide-gray-100">
                            {notifications.length === 0 ? (
                                <div className="p-20 text-center text-gray-400">
                                    <Bell size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>No notifications yet</p>
                                </div>
                            ) : (
                                notifications.map((notif) => (
                                    <div key={notif._id} className={`p-6 flex items-start space-x-4 ${!notif.read ? 'bg-orange-50/50' : ''}`}>
                                        <div className={`p-2 rounded-lg ${notif.type === 'success' ? 'bg-green-100 text-green-600' :
                                                notif.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                                    notif.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            <Bell size={20} />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-gray-900">{notif.title}</h4>
                                                <span className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Product Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                                    </h3>
                                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form className="space-y-4" onSubmit={async (e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    const data = Object.fromEntries(formData.entries());
                                    const token = localStorage.getItem('token');
                                    const url = editingProduct
                                        ? `http://localhost:5000/api/products/${editingProduct._id}`
                                        : 'http://localhost:5000/api/products';

                                    await fetch(url, {
                                        method: editingProduct ? 'PUT' : 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify({
                                            ...data,
                                            price: parseFloat(data.price as string),
                                            stock: parseInt(data.stock as string)
                                        })
                                    });

                                    setIsModalOpen(false);
                                    fetchProducts();
                                }}>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                                        <input name="name" defaultValue={editingProduct?.name} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f98203] outline-none" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                                            <input name="price" type="number" step="0.01" defaultValue={editingProduct?.price} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f98203] outline-none" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
                                            <input name="stock" type="number" defaultValue={editingProduct?.stock} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f98203] outline-none" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                                        <input name="image" defaultValue={editingProduct?.image} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f98203] outline-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                                        <select name="category" defaultValue={editingProduct?.category} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f98203] outline-none">
                                            <option>Supplements</option>
                                            <option>Beauty</option>
                                            <option>Grocery</option>
                                            <option>Home</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="w-full bg-[#f98203] text-white py-4 rounded-xl font-bold hover:bg-[#e07502] transition-all mt-6 shadow-lg shadow-[#f98203]/20">
                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
