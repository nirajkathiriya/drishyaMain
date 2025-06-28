import React, { useState, useEffect } from 'react';
import { Users, Video, TrendingUp, Clock, CheckCircle, AlertCircle, Upload, Download, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AuthService } from '../services/authService';

export function Admin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userStats, setUserStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    verified: 0
  });
  const [users, setUsers] = useState<any[]>([]);

  const authService = AuthService.getInstance();

  useEffect(() => {
    // Load user statistics
    const stats = authService.getUserStats();
    setUserStats(stats);
    
    // Load all users
    const allUsers = authService.getAllUsers();
    setUsers(allUsers);
  }, []);

  const stats = [
    { label: 'Total Orders', value: '156', icon: Video, change: '+12%', color: 'from-purple-500 to-purple-600' },
    { label: 'Active Projects', value: '23', icon: Clock, change: '+5%', color: 'from-blue-500 to-blue-600' },
    { label: 'Completed This Month', value: '89', icon: CheckCircle, change: '+18%', color: 'from-green-500 to-green-600' },
    { label: 'Total Users', value: userStats.total.toString(), icon: Users, change: `+${userStats.thisWeek}`, color: 'from-orange-500 to-red-500' }
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Sarah Johnson',
      type: 'promotional',
      plan: 'Standard',
      status: 'script-review',
      assignedTo: 'Emma Wilson',
      createdAt: '2024-01-20'
    },
    {
      id: 'ORD-002',
      customer: 'Tech Startup Inc.',
      type: 'informative',
      plan: 'Premium',
      status: 'production',
      assignedTo: 'Mike Chen',
      createdAt: '2024-01-19'
    },
    {
      id: 'ORD-003',
      customer: 'Marketing Pro',
      type: 'emotional',
      plan: 'Basic',
      status: 'editing',
      assignedTo: 'Lisa Rodriguez',
      createdAt: '2024-01-18'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'script-review': return 'bg-yellow-100 text-yellow-800';
      case 'production': return 'bg-purple-100 text-purple-800';
      case 'editing': return 'bg-blue-100 text-blue-800';
      case 'finalization': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportEmails = () => {
    const emails = authService.exportUserEmails();
    const emailList = emails.join('\n');
    const blob = new Blob([emailList], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user-emails-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSendBulkEmail = () => {
    const emails = authService.exportUserEmails();
    const subject = 'Updates from Drishya - AI Video Platform';
    const body = 'Hello! We have exciting updates to share with you...';
    
    // In a real app, this would integrate with an email service
    alert(`Would send email to ${emails.length} users:\n\nSubject: ${subject}\n\nThis would integrate with your email service provider.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage orders, track performance, and oversee video production.</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} hover>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'orders', 'users', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Plan</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Assigned To</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4 capitalize">{order.type}</td>
                          <td className="py-3 px-4">{order.plan}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status.replace('-', ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-4">{order.assignedTo}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm" variant="ghost" icon={Upload}>Upload</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">All Orders</h3>
                <div className="flex space-x-2">
                  <Button variant="outline">Filter</Button>
                  <Button variant="outline">Export</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Complete order management interface would be implemented here.</p>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Statistics */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" icon={Download} onClick={handleExportEmails}>
                      Export Emails
                    </Button>
                    <Button variant="outline" icon={Mail} onClick={handleSendBulkEmail}>
                      Send Bulk Email
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{userStats.total}</div>
                    <div className="text-sm text-blue-600">Total Users</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{userStats.today}</div>
                    <div className="text-sm text-green-600">Signed Up Today</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{userStats.thisWeek}</div>
                    <div className="text-sm text-purple-600">This Week</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{userStats.thisMonth}</div>
                    <div className="text-sm text-orange-600">This Month</div>
                  </div>
                </div>

                {/* User List */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Joined</th>
                        <th className="text-left py-3 px-4">Last Login</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.slice(0, 10).map((user) => (
                        <tr key={user.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium">{user.name}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">{user.createdAt.toLocaleDateString()}</td>
                          <td className="py-3 px-4">{user.lastLoginAt.toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.isVerified ? 'Verified' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {users.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No users have signed up yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Analytics & Reports</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Detailed analytics, performance metrics, and reporting dashboard.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}