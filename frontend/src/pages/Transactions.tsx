import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const transactions = [
  {
    id: '1',
    description: 'Salary Deposit',
    amount: 5000,
    type: 'income',
    date: '2024-03-15',
    category: 'Income',
    account: 'Chase Checking'
  },
  {
    id: '2',
    description: 'Grocery Shopping',
    amount: 150.75,
    type: 'expense',
    date: '2024-03-14',
    category: 'Food',
    account: 'Chase Credit Card'
  },
  {
    id: '3',
    description: 'Netflix Subscription',
    amount: 15.99,
    type: 'expense',
    date: '2024-03-13',
    category: 'Entertainment',
    account: 'Amex'
  },
  {
    id: '4',
    description: 'Freelance Payment',
    amount: 2000,
    type: 'income',
    date: '2024-03-12',
    category: 'Income',
    account: 'Chase Checking'
  }
];

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mint-200 h-5 w-5" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-mint-100 rounded-lg focus:ring-2 focus:ring-mint-200 focus:border-mint-200"
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 bg-white border border-mint-100 rounded-lg hover:bg-mint-50 text-mint-300"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filter
        </button>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg border border-mint-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-mint-300 mb-1">Date Range</label>
              <select className="w-full border-mint-100 rounded-lg focus:ring-mint-200 focus:border-mint-200">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
                <option>Custom range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-mint-300 mb-1">Category</label>
              <select className="w-full border-mint-100 rounded-lg focus:ring-mint-200 focus:border-mint-200">
                <option>All Categories</option>
                <option>Income</option>
                <option>Food</option>
                <option>Entertainment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-mint-300 mb-1">Account</label>
              <select className="w-full border-mint-100 rounded-lg focus:ring-mint-200 focus:border-mint-200">
                <option>All Accounts</option>
                <option>Chase Checking</option>
                <option>Chase Credit Card</option>
                <option>Amex</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-mint-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-mint-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-mint-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-mint-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-mint-300 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-mint-300 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-mint-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-full mr-3 ${
                        transaction.type === 'income'
                          ? 'bg-mint-100 text-mint-300'
                          : 'bg-expense-100 text-expense-300'
                      }`}>
                        {transaction.type === 'income'
                          ? <ArrowUpRight className="h-4 w-4" />
                          : <ArrowDownRight className="h-4 w-4" />
                        }
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.account}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    transaction.type === 'income'
                      ? 'text-mint-300'
                      : 'text-expense-300'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    ${transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}