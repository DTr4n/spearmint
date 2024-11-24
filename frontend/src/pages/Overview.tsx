import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const networthData = [
  { month: 'Jan', amount: 25000 },
  { month: 'Feb', amount: 27500 },
  { month: 'Mar', amount: 28900 },
  { month: 'Apr', amount: 31200 },
  { month: 'May', amount: 32800 },
  { month: 'Jun', amount: 35000 },
];

const transactions = [
  {
    id: '1',
    description: 'Salary Deposit',
    amount: 5000,
    type: 'income',
    date: '2024-03-15',
    category: 'Income'
  },
  {
    id: '2',
    description: 'Grocery Shopping',
    amount: 150.75,
    type: 'expense',
    date: '2024-03-14',
    category: 'Food'
  },
  {
    id: '3',
    description: 'Netflix Subscription',
    amount: 15.99,
    type: 'expense',
    date: '2024-03-13',
    category: 'Entertainment'
  }
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Overview</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Net Worth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Net Worth</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={networthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`$${value}`, 'Net Worth']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem' }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">Income</p>
                  <p className="text-2xl font-bold text-emerald-700">$6,240</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-emerald-500" />
              </div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Expenses</p>
                  <p className="text-2xl font-bold text-red-700">$2,850</p>
                </div>
                <ArrowDownRight className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <PieChartIcon className="h-48 w-48 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'income'
                    ? <ArrowUpRight className="h-5 w-5" />
                    : <ArrowDownRight className="h-5 w-5" />
                  }
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'income'
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}