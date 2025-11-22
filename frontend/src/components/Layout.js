import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaBox,
  FaWarehouse,
  FaExchangeAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaTruck,
  FaClipboardList,
  FaCube,
  FaHistory,
  FaUserCircle
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const role = user.role || 'Inventory Manager';

  const allMenuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FaChartLine />, roles: ['Inventory Manager'] },
    { path: '/products', label: 'Products', icon: <FaBox />, roles: ['Inventory Manager'] },
    { path: '/stock', label: 'Inventory', icon: <FaBox />, roles: ['Inventory Manager', 'Warehouse Staff'] },
    { path: '/operations/receipts', label: 'Receipts', icon: <FaClipboardList />, roles: ['Inventory Manager'] },
    { path: '/operations/deliveries', label: 'Deliveries', icon: <FaTruck />, roles: ['Inventory Manager'] },
    { path: '/operations/transfers', label: 'Transfers', icon: <FaExchangeAlt />, roles: ['Inventory Manager', 'Warehouse Staff'] },
    { path: '/operations/adjustments/new', label: 'Adjustments', icon: <FaCog />, roles: ['Inventory Manager', 'Warehouse Staff'] },
    { path: '/operations/moves', label: 'Stock Ledger', icon: <FaHistory />, roles: ['Inventory Manager', 'Warehouse Staff'] },
    { path: '/settings/warehouse', label: 'Warehouses', icon: <FaWarehouse />, roles: ['Inventory Manager'] },
    { path: '/settings/location', label: 'Locations', icon: <FaCog />, roles: ['Inventory Manager'] },
    { path: '/profile', label: 'Profile', icon: <FaUserCircle />, roles: ['Inventory Manager', 'Warehouse Staff'] },
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(role));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <FaCube size={28} />
          <span>StockMaster</span>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <small style={{
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontSize: '0.7rem',
            fontWeight: '600',
            letterSpacing: '0.1em',
            paddingLeft: '1rem'
          }}>
            Main Menu
          </small>
        </div>

        <nav className="sidebar-nav" style={{ flex: 1 }}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
            >
              <span style={{ marginRight: '12px', fontSize: '1.1em' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <button onClick={handleLogout} className="nav-item" style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--danger)' }}>
            <span style={{ marginRight: '12px' }}><FaSignOutAlt /></span>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
