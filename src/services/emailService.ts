// Email service for order confirmations
export interface OrderConfirmation {
  orderId: string;
  customerEmail: string;
  customerName: string;
  videoType: string;
  plan: {
    name: string;
    price: number;
    deliveryDays: number;
  };
  avatar: {
    name: string;
  };
  estimatedDelivery: string;
  orderTotal: number;
}

export class EmailService {
  private static instance: EmailService;
  
  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendOrderConfirmation(orderData: OrderConfirmation): Promise<boolean> {
    try {
      // In a real application, this would integrate with an email service like:
      // - SendGrid
      // - Mailgun
      // - AWS SES
      // - Resend
      
      const emailTemplate = this.generateOrderConfirmationEmail(orderData);
      
      // Simulate API call to email service
      const response = await this.mockEmailAPI(orderData.customerEmail, emailTemplate);
      
      if (response.success) {
        console.log(`Order confirmation sent to ${orderData.customerEmail}`);
        return true;
      }
      
      throw new Error('Failed to send email');
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
  }

  private generateOrderConfirmationEmail(orderData: OrderConfirmation): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation - AI Video Pro</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e1e5e9; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          .order-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .highlight { color: #667eea; font-weight: bold; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎬 Order Confirmed!</h1>
            <p>Thank you for choosing AI Video Pro</p>
          </div>
          
          <div class="content">
            <h2>Hi ${orderData.customerName}!</h2>
            
            <p>Great news! We've received your order and our team is already getting started on your amazing AI video.</p>
            
            <div class="order-details">
              <h3>📋 Order Details</h3>
              <p><strong>Order ID:</strong> <span class="highlight">${orderData.orderId}</span></p>
              <p><strong>Video Type:</strong> ${orderData.videoType}</p>
              <p><strong>Plan:</strong> ${orderData.plan.name}</p>
              <p><strong>AI Avatar:</strong> ${orderData.avatar.name}</p>
              <p><strong>Estimated Delivery:</strong> <span class="highlight">${orderData.estimatedDelivery}</span></p>
              <p><strong>Total:</strong> <span class="highlight">$${orderData.orderTotal}</span></p>
            </div>
            
            <h3>🚀 What Happens Next?</h3>
            <ol>
              <li><strong>Script Review</strong> - Our team reviews your script (24-48 hours)</li>
              <li><strong>AI Generation</strong> - Your video is created with your chosen avatar</li>
              <li><strong>Professional Editing</strong> - Our editors add the finishing touches</li>
              <li><strong>Quality Check</strong> - Final review to ensure perfection</li>
              <li><strong>Delivery</strong> - Your video is delivered via email</li>
            </ol>
            
            <p>You can track your order progress anytime by visiting your dashboard.</p>
            
            <a href="#" class="button">Track Your Order</a>
            
            <h3>💬 Need Help?</h3>
            <p>Our support team is here to help! Reply to this email or contact us at support@aivideopro.com</p>
          </div>
          
          <div class="footer">
            <p>AI Video Pro - Creating Professional Videos with AI</p>
            <p>© 2024 AI Video Pro. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private async mockEmailAPI(email: string, template: string): Promise<{ success: boolean; messageId?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate 95% success rate
    const success = Math.random() > 0.05;
    
    if (success) {
      return {
        success: true,
        messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    } else {
      throw new Error('Email service temporarily unavailable');
    }
  }

  async sendStatusUpdate(orderId: string, customerEmail: string, status: string, message: string): Promise<boolean> {
    try {
      const emailTemplate = this.generateStatusUpdateEmail(orderId, status, message);
      const response = await this.mockEmailAPI(customerEmail, emailTemplate);
      return response.success;
    } catch (error) {
      console.error('Status update email error:', error);
      return false;
    }
  }

  private generateStatusUpdateEmail(orderId: string, status: string, message: string): string {
    const statusEmojis: { [key: string]: string } = {
      'script-review': '📝',
      'production': '🎬',
      'editing': '✂️',
      'finalization': '🎨',
      'delivered': '🎉'
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Update - AI Video Pro</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e1e5e9; }
          .status-update { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${statusEmojis[status] || '📹'} Order Update</h1>
            <p>Your AI video is progressing!</p>
          </div>
          
          <div class="content">
            <div class="status-update">
              <h3>Status: ${status.replace('-', ' ').toUpperCase()}</h3>
              <p>${message}</p>
              <p><strong>Order ID:</strong> ${orderId}</p>
            </div>
            
            <p>Thank you for your patience. We'll keep you updated as your video progresses through each stage.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}