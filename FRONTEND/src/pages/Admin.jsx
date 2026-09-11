import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import AdminProducts from '../components/admin/AdminProducts'
import AdminOrders from '../components/admin/AdminOrders'
import AdminUsers from '../components/admin/AdminUsers'

const TABS = ['Products', 'Orders', 'Users']

function Admin() {
  const { isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('Products')

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <p className="pt-24 text-center text-gray-400">
          You don't have access to this page.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-24 px-6 pb-16">
        <h1 className="font-['Fraunces'] text-3xl mb-8">Admin</h1>

        <div className="flex gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                activeTab === tab
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Products' && <AdminProducts />}
        {activeTab === 'Orders' && <AdminOrders />}
        {activeTab === 'Users' && <AdminUsers />}
      </div>
    </div>
  )
}

export default Admin