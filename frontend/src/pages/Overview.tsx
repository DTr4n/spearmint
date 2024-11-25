import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Generate 12 months of sample data
const networthData = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (11 - i));
  return {
    month: date.toLocaleString('default', { month: 'short' }),
    amount: 25000 + (i * 1000) + Math.random() * 2000
  };
});

const monthlySummary = {
  savings: 6200,
  expenses: 2850,
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    end: new Date().toLocaleDateString()
  }
};

const COLORS = ['#7A9E7E', '#FF8080']; // Mint-200 for Savings, Custom red for Expenses

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
  }
];

export default function Overview() {
  const navigate = useNavigate();
  const netWorth = networthData[networthData.length - 1].amount;
  const pieData = [
    { name: 'Savings', value: monthlySummary.savings },
    { name: 'Expenses', value: monthlySummary.expenses }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Net Worth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-mint-300">Net Worth</h2>
            <button 
              onClick={() => navigate('/accounts')}
              className="text-sm text-mint-200 hover:text-mint-300 flex items-center"
            >
              See All Accounts <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <p className="text-2xl font-bold text-mint-300 mb-4">
            ${netWorth.toLocaleString()}
          </p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={networthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8F1F2" />
                <XAxis dataKey="month" stroke="#7A9E7E" />
                <YAxis 
                  stroke="#7A9E7E"
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Net Worth']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem' }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#7A9E7E"
                  strokeWidth={2}
                  dot={{ fill: '#7A9E7E' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="mb-2">
            <h2 className="text-lg font-semibold text-mint-300">Monthly Summary</h2>
            <p className="text-sm text-gray-500">
              {monthlySummary.dateRange.start} - {monthlySummary.dateRange.end}
            </p>
          </div>

          <div className="relative h-[300px]">
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <p className="text-sm font-medium text-gray-600">Net Income</p>
              <p className="text-2xl font-bold text-mint-300">
                ${(monthlySummary.savings - monthlySummary.expenses).toLocaleString()}
              </p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom"
                  formatter={(value, entry) => {
                    const amount = entry.payload.value;
                    return `${value}: $${amount.toLocaleString()}`;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-mint-300">Recent Transactions</h2>
          <button 
            onClick={() => navigate('/transactions')}
            className="text-sm text-mint-200 hover:text-mint-300 flex items-center"
          >
            See All <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
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