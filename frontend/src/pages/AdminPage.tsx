import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'news'>('products');
  const [msg, setMsg] = useState('');

  
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', oldPrice: '', brand: '', article: '', categoryId: '', subcategoryId: ''
  });
  const [productImg, setProductImg] = useState<File | null>(null);

  
  const [newsForm, setNewsForm] = useState({ title: '', excerpt: '', content: '', category: 'События' });
  const [newsImg, setNewsImg] = useState<File | null>(null);

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(console.error);
  }, []);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    const fd = new FormData();
    Object.entries(productForm).forEach(([k,v]) => fd.append(k, v));
    if (productImg) fd.append('image', productImg);

    try {
      
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      if (!res.ok) throw new Error('Ошибка при добавлении товара');
      setMsg('Товар успешно добавлен!');
      setProductForm({ name: '', description: '', price: '', oldPrice: '', brand: '', article: '', categoryId: '', subcategoryId: '' });
      setProductImg(null);
    } catch (err: any) {
      setMsg(err.message);
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    const fd = new FormData();
    Object.entries(newsForm).forEach(([k,v]) => fd.append(k, v));
    if (newsImg) fd.append('image', newsImg);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/news', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      if (!res.ok) throw new Error('Ошибка при добавлении новости');
      setMsg('Новость успешно добавлена!');
      setNewsForm({ title: '', excerpt: '', content: '', category: 'События' });
      setNewsImg(null);
    } catch (err: any) {
      setMsg(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
      <h1 className="section-title mb-4">
        Панель <span>администратора</span>
      </h1>
      <div className="accent-line mx-auto mb-10" />

      <div className="flex gap-4 justify-center mb-8">
        <button 
          className={`px-6 py-2 rounded-full font-bold transition-colors ${activeTab === 'products' ? 'bg-[#F3C15F] text-black' : 'glass text-[var(--color-text)]'}`}
          onClick={() => setActiveTab('products')}
        >
          Добавить товар
        </button>
        <button 
          className={`px-6 py-2 rounded-full font-bold transition-colors ${activeTab === 'news' ? 'bg-[#F3C15F] text-black' : 'glass text-[var(--color-text)]'}`}
          onClick={() => setActiveTab('news')}
        >
          Добавить новость
        </button>
      </div>

      {msg && <div className="text-center text-green-500 font-bold mb-6">{msg}</div>}

      {activeTab === 'products' && (
        <form onSubmit={handleProductSubmit} className="glass p-8 rounded-3xl max-w-2xl mx-auto flex flex-col gap-4 shadow-xl">
          <input className="input-glass p-3 rounded-lg" placeholder="Название товара" value={productForm.name} onChange={e=>setProductForm({...productForm, name: e.target.value})} required />
          <textarea className="input-glass p-3 rounded-lg" placeholder="Описание" rows={3} value={productForm.description} onChange={e=>setProductForm({...productForm, description: e.target.value})} />
          <div className="flex gap-4">
            <input className="input-glass p-3 rounded-lg flex-1" type="number" placeholder="Цена" value={productForm.price} onChange={e=>setProductForm({...productForm, price: e.target.value})} required />
            <input className="input-glass p-3 rounded-lg flex-1" type="number" placeholder="Старая цена (опционально)" value={productForm.oldPrice} onChange={e=>setProductForm({...productForm, oldPrice: e.target.value})} />
          </div>
          <div className="flex gap-4">
            <input className="input-glass p-3 rounded-lg flex-1" placeholder="Бренд" value={productForm.brand} onChange={e=>setProductForm({...productForm, brand: e.target.value})} />
            <input className="input-glass p-3 rounded-lg flex-1" placeholder="Артикул" value={productForm.article} onChange={e=>setProductForm({...productForm, article: e.target.value})} />
          </div>
          
          <div className="flex gap-4">
            <select className="input-glass p-3 rounded-lg flex-1" value={productForm.categoryId} onChange={e=>setProductForm({...productForm, categoryId: e.target.value})}>
              <option value="">Выберите категорию...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm text-[var(--color-text)] font-semibold">Фото товара</label>
            <input type="file" accept="image/*" onChange={e => setProductImg(e.target.files?.[0] || null)} className="input-glass p-2 rounded-lg w-full" />
          </div>

          <button type="submit" className="btn-primary mt-4 py-3 text-lg">Сохранить товар</button>
        </form>
      )}

      {activeTab === 'news' && (
        <form onSubmit={handleNewsSubmit} className="glass p-8 rounded-3xl max-w-2xl mx-auto flex flex-col gap-4 shadow-xl">
          <input className="input-glass p-3 rounded-lg" placeholder="Заголовок новости" value={newsForm.title} onChange={e=>setNewsForm({...newsForm, title: e.target.value})} required />
          <input className="input-glass p-3 rounded-lg" placeholder="Краткое описание" value={newsForm.excerpt} onChange={e=>setNewsForm({...newsForm, excerpt: e.target.value})} required />
          <textarea className="input-glass p-3 rounded-lg" placeholder="Полный текст новости" rows={5} value={newsForm.content} onChange={e=>setNewsForm({...newsForm, content: e.target.value})} required />
          
          <select className="input-glass p-3 rounded-lg" value={newsForm.category} onChange={e=>setNewsForm({...newsForm, category: e.target.value})}>
            <option value="События">События</option>
            <option value="Акции">Акции</option>
            <option value="Поступления">Поступления</option>
          </select>

          <div>
            <label className="block mb-2 text-sm text-[var(--color-text)] font-semibold">Обложка новости</label>
            <input type="file" accept="image/*" onChange={e => setNewsImg(e.target.files?.[0] || null)} className="input-glass p-2 rounded-lg w-full" />
          </div>

          <button type="submit" className="btn-primary mt-4 py-3 text-lg">Опубликовать новость</button>
        </form>
      )}
    </div>
  );
};

export default AdminPage;
