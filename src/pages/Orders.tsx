import React from 'react';
import { Clock, Download, Edit, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Orders() {
  const navigate = useNavigate();

  const orders = [
    {
      id: '1',
      title: 'Product Launch Video',
      type: 'promotional',
      status: { stage: 'delivered', progress: 100, message: 'Video ready for download' },
      createdAt: new Date('2024-01-15'),
      deliveryDate: new Date('2024-01-22'),
      plan: { name: 'Standard', price: 50 },
      finalVideoUrl: '#'
    },
    {
      id: '2',
      title: 'How-to Tutorial',
      type: 'informative',
      status: { stage: 'editing', progress: 75, message: 'Final touches being applied' },
      createdAt: new Date('2024-01-18'),
      deliveryDate: new Date('2024-01-25'),
      plan: { name: 'Premium', price: 90 }
    },
    {
      id: '3',
      title: 'Customer Success Story',
      type: 'emotional',
      status: { stage: 'script-review', progress: 25, message: 'Script under review' },
      createdAt: new Date('2024-01-20'),
      deliveryDate: new Date('2024-01-27'),
      plan: { name: 'Basic', price: 15 }
    }
  ];

  const getStatusColor = (stage: string) => {
    switch (stage) {
      case 'delivered': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'editing': case 'finalization': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'production': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'script-review': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (stage: string) => {
    switch (stage) {
      case 'delivered': return CheckCircle;
      case 'editing': case 'finalization': case 'production': return Clock;
      case 'script-review': return AlertCircle;
      default: return Clock;
    }
  };

  const handleDownloadVideo = (orderId: string) => {
    // In a real app, this would download the video file
    alert(`Downloading video for order ${orderId}`);
  };

  const handleRequestRevision = (orderId: string) => {
    // In a real app, this would open a revision request form
    alert(`Opening revision request form for order ${orderId}`);
  };

  const handleViewDetails = (orderId: string) => {
    // In a real app, this would navigate to order details page
    alert(`Viewing details for order ${orderId}`);
  };

  const handleCreateFirstVideo = () => {
    navigate('/create');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
            <p className="text-gray-400">Track the progress of your AI video projects.</p>
          </div>
          <Button 
            variant="outline" 
            icon={ArrowLeft} 
            onClick={handleBackToHome}
            className="glass border-white/20 text-white hover:bg-white/10"
          >
            Back to Home
          </Button>
        </div>
        
        <div className="space-y-6">
          {orders.map((order) => {
            const StatusIcon = getStatusIcon(order.status.stage);
            
            return (
              <Card key={order.id} className="card-professional rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{order.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>Order #{order.id}</span>
                        <span>•</span>
                        <span className="capitalize">{order.type}</span>
                        <span>•</span>
                        <span>{order.plan.name} Plan</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-white">${order.plan.price}</div>
                      <div className="text-sm text-gray-400">
                        Due: {order.deliveryDate.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <StatusIcon className={`h-5 w-5 ${getStatusColor(order.status.stage).split(' ')[0]}`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status.stage)}`}>
                          {order.status.stage.replace('-', ' ').toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-400">{order.status.progress}% Complete</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${order.status.progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{order.status.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div className="text-sm text-gray-400">
                      Ordered on {order.createdAt.toLocaleDateString()}
                    </div>
                    
                    <div className="flex space-x-3">
                      {order.status.stage === 'delivered' && order.finalVideoUrl && (
                        <Button 
                          size="sm" 
                          icon={Download}
                          onClick={() => handleDownloadVideo(order.id)}
                          className="btn-professional bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        >
                          Download Video
                        </Button>
                      )}
                      
                      {order.status.stage !== 'delivered' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          icon={Edit}
                          onClick={() => handleRequestRevision(order.id)}
                          className="glass border-white/20 text-white hover:bg-white/10"
                        >
                          Request Revision
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleViewDetails(order.id)}
                        className="text-gray-400 hover:text-white hover:bg-white/5"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {orders.length === 0 && (
          <Card className="card-professional rounded-2xl">
            <CardContent className="p-12 text-center">
              <div className="mb-4">
                <Clock className="h-12 w-12 text-gray-500 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No Orders Yet</h3>
              <p className="text-gray-400 mb-6">You haven't created any video projects yet.</p>
              <Button 
                onClick={handleCreateFirstVideo}
                className="btn-professional bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Create Your First Video
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}