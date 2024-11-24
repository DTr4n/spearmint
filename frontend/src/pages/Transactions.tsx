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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          Filter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-full mr-3 ${
                        transaction.type === 'income'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-red-100 text-red-600'
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
                      ? 'text-emerald-600'
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    ${transaction.amount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
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