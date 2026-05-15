import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase, isConfigured } from '../utils/supabaseClient';
import { 
    Package, 
    Bell, 
    Plus, 
    Edit2, 
    Trash2, 
    X, 
    AlertTriangle, 
    Lock, 
    Mail, 
    Search, 
    LogOut, 
    Filter,
    LayoutGrid,
    ShoppingBag,
    Menu,
    ChevronLeft,
    List as ListIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}

const categories = [
    'All',
    'Supplements',
    'Sports',
    'Bath',
    'Beauty',
    'Grocery',
    'Baby',
    'Pets',
    'Bedroom Products'
];

interface Order {
    id: string;
    customer_name: string;
    customer_email: string;
    total_amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: any[];
    created_at: string;
}



export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const { user, login, logout, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isConfigured || !isAuthenticated) return;
        fetchProducts();
        fetchOrders();

        const productSubscription = supabase.channel('admin_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => fetchProducts())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => fetchOrders())
            .subscribe();

        return () => { productSubscription.unsubscribe(); };
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        try {
            await login(email, password);
        } catch (err: any) {
            setLoginError(err.message || 'Login failed');
        }
    };

    const fetchProducts = async () => {
        const { data, error } = await supabase.from('products').select('*').order('name');
        if (!error) setProducts(data || []);
    };

    const fetchOrders = async () => {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (!error) setOrders(data || []);
    };

    const handleDeleteProduct = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) fetchProducts();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        const productData = {
            name: data.name as string,
            price: parseFloat(data.price as string),
            image: data.image as string,
            category: data.category as string,
            stock: parseInt(data.stock as string) || 100,
        };

        if (editingProduct) {
            const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
            if (!error) setIsModalOpen(false);
        } else {
            const { error } = await supabase.from('products').insert([productData]);
            if (!error) setIsModalOpen(false);
        }
        fetchProducts();
    };

    if (!isConfigured) return null;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-md w-full border border-gray-100">
                    <div className="text-center mb-10">
                        <img src="/images/Pure Essence logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-6 object-contain" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
                        <p className="text-gray-500">Sign in to manage your store</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        {loginError && <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold">{loginError}</div>}
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-pink-100 outline-none transition-all" required />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-4 focus:ring-pink-100 outline-none transition-all" required />
                        <button type="submit" className="w-full bg-[#dd2581] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#c01d6d] transition-all shadow-xl shadow-pink-200">Sign In</button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#fdf2f7] flex relative overflow-x-hidden">
            {/* Mobile Toggle Button */}
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden fixed top-6 left-6 z-40 bg-[#dd2581] text-white p-3 rounded-2xl shadow-xl active:scale-95 transition-all"
            >
                <Menu size={24} />
            </button>

            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[45]"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`
                fixed md:sticky top-0 left-0 h-screen w-72 bg-[#dd2581] text-white z-50 flex flex-col shadow-2xl transition-transform duration-300
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-8">
                    {/* Close button (Mobile only) */}
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden absolute top-6 right-6 text-white/60 hover:text-white"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="mb-12 text-center">
                        <img src="/images/Pure Essence logo.png" alt="Logo" className="w-32 h-32 mx-auto object-contain brightness-0 invert opacity-100" />
                    </div>
                    <div className="mb-10 text-center">
                        <h1 className="text-2xl font-bold tracking-widest">ESSENCE</h1>
                        <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Admin Portal</p>
                    </div>

                    <nav className="space-y-3">
                        <button 
                            onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }} 
                            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-[1.5rem] transition-all font-semibold ${activeTab === 'products' ? 'bg-[#f98203] text-white shadow-xl shadow-black/20' : 'hover:bg-white/10'}`}
                        >
                            <Package size={20} />
                            <span>Products</span>
                        </button>
                        <button 
                            onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }} 
                            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-[1.5rem] transition-all font-semibold ${activeTab === 'orders' ? 'bg-[#f98203] text-white shadow-xl shadow-black/20' : 'hover:bg-white/10'}`}
                        >
                            <ShoppingBag size={20} />
                            <span>Orders</span>
                            {orders.filter(o => o.status === 'pending').length > 0 && (
                                <span className="ml-auto bg-white text-[#f98203] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    {orders.filter(o => o.status === 'pending').length}
                                </span>
                            )}
                        </button>
                    </nav>
                </div>

                <div className="mt-auto p-8">
                    <button onClick={logout} className="w-full flex items-center space-x-4 px-6 py-4 rounded-[1.5rem] bg-[#f98203] hover:bg-[#e07502] transition-all font-bold text-sm text-white shadow-lg shadow-black/20">
                        <LogOut size={18} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-6 md:p-12 w-full">
                <header className="flex flex-col md:flex-row justify-between items-center md:items-center mb-12 gap-6 mt-16 md:mt-0 text-center md:text-left">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{activeTab === 'products' ? 'Product Catalog' : 'Customer Orders'}</h2>
                        <p className="text-gray-500 font-medium">
                            {activeTab === 'products' ? 'Manage your store\'s inventory and details' : 'Track and manage your customer purchases'}
                        </p>
                    </div>
                    {activeTab === 'products' && (
                        <button onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} className="w-full md:w-auto bg-[#f98203] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-[#e07502] transition-all shadow-2xl shadow-orange-100">
                            <Plus size={24} />
                            <span>Add New Product</span>
                        </button>
                    )}
                </header>

                {activeTab === 'products' ? (
                    <>
                        {/* Filters Bar */}
                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-orange-50 flex flex-col gap-6 mb-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Search by name..." 
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-100 outline-none text-sm font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 px-1">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${selectedCategory === cat ? 'bg-[#f98203] text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                            {filteredProducts.map(product => (
                                <motion.div layout key={product.id} className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-orange-50 overflow-hidden group hover:shadow-xl transition-all duration-300">
                                    <div className="relative aspect-[4/3] bg-gray-50 p-2 md:p-4">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[8px] md:text-[10px] font-bold text-[#f98203] shadow-sm border border-orange-50">
                                            {product.category}
                                        </div>
                                    </div>
                                    <div className="p-3 md:p-5 text-center">
                                        <h3 className="font-bold text-[10px] md:text-sm text-gray-800 mb-1 leading-tight min-h-[2.5em]">{product.name}</h3>
                                        <div className="flex flex-col items-center mb-3 md:mb-4">
                                            <span className="text-[#f98203] font-bold text-sm md:text-lg">${product.price.toFixed(2)}</span>
                                            <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider">{product.stock} left</span>
                                        </div>
                                        <div className="flex gap-1 md:gap-2">
                                            <button onClick={() => { setEditingProduct(product); setIsModalOpen(true); }} className="flex-1 bg-[#f98203] text-white p-2 md:p-2.5 rounded-lg md:rounded-xl hover:bg-[#e07502] transition-all flex justify-center shadow-md">
                                                <Edit2 size={14} className="md:w-4 md:h-4" />
                                            </button>
                                            <button onClick={() => handleDeleteProduct(product.id)} className="flex-1 bg-[#dd2581] text-white p-2 md:p-2.5 rounded-lg md:rounded-xl hover:bg-[#c01d6d] transition-all flex justify-center shadow-md">
                                                <Trash2 size={14} className="md:w-4 md:h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                ) : (
                    /* Orders View */
                    <div className="bg-white rounded-[3rem] shadow-sm border border-orange-50 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Date</th>
                                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 font-medium text-sm">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center text-gray-400">
                                                No orders placed yet
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map(order => (
                                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-5">
                                                    <div className="font-bold text-gray-900">{order.customer_name}</div>
                                                    <div className="text-xs text-gray-500">{order.customer_email}</div>
                                                </td>
                                                <td className="px-8 py-5 font-bold text-[#f98203]">${order.total_amount.toFixed(2)}</td>
                                                <td className="px-8 py-5">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                        order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                                                        order.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                                                        'bg-blue-100 text-blue-600'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-gray-500 hidden sm:table-cell">{new Date(order.created_at).toLocaleDateString()}</td>
                                                <td className="px-8 py-5">
                                                    <button className="text-[#f98203] hover:underline font-bold text-xs">View</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden p-10">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="bg-gray-100 p-2 rounded-full hover:bg-pink-100 hover:text-[#dd2581] transition-all"><X size={20} /></button>
                            </div>
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Product Name</label>
                                    <input name="name" defaultValue={editingProduct?.name} className="w-full px-6 py-3.5 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-pink-100 outline-none font-bold text-sm" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Price ($)</label>
                                        <input name="price" type="number" step="0.01" defaultValue={editingProduct?.price} className="w-full px-6 py-3.5 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-pink-100 outline-none font-bold text-sm" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Stock</label>
                                        <input name="stock" type="number" defaultValue={editingProduct?.stock || 100} className="w-full px-6 py-3.5 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-pink-100 outline-none font-bold text-sm" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Image URL</label>
                                    <input name="image" defaultValue={editingProduct?.image} className="w-full px-6 py-3.5 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-pink-100 outline-none font-bold text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Category</label>
                                    <select name="category" defaultValue={editingProduct?.category} className="w-full px-6 py-3.5 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-pink-100 outline-none font-bold text-sm appearance-none">
                                        {categories.slice(1).map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <button type="submit" className="w-full bg-[#dd2581] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#c01d6d] transition-all shadow-xl shadow-pink-200 mt-4">
                                    {editingProduct ? 'Save Changes' : 'Create Product'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
