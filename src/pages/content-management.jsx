import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import FAQsTab from '../components/content/FAQsTab';
import CategoriesTab from '../components/content/CategoriesTab';
import BlogsTab from '../components/content/BlogsTab';
import TestimoniesTab from '../components/content/TestimoniesTab';
import SubscribersTab from '../components/content/SubscribersTab';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('faqs');

  const tabs = [
    { id: 'faqs', label: 'FAQs', count: 0 },
    { id: 'categories', label: 'Categories', count: 0 },
    { id: 'blogs', label: 'Blogs', count: 0 },
    { id: 'testimonies', label: 'Testimonies', count: 0 },
    { id: 'subscribers', label: 'Subscribers', count: 0 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'faqs':
        return <FAQsTab />;
      case 'categories':
        return <CategoriesTab />;
      case 'blogs':
        return <BlogsTab />;
      case 'testimonies':
        return <TestimoniesTab />;
      case 'subscribers':
        return <SubscribersTab />;
      default:
        return <FAQsTab />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-600 mt-2">Manage your website content and resources</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ContentManagement;