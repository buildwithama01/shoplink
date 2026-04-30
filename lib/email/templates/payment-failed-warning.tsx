import * as React from 'react';

interface Props {
  storeName: string;
  daysRemaining: number;
  gracePeriodEnds: string;
  loginUrl: string;
}

export const PaymentFailedWarningEmail: React.FC<Readonly<Props>> = ({
  storeName,
  daysRemaining,
  gracePeriodEnds,
  loginUrl,
}) => (
  <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
    <h2 style={{ color: '#eab308' }}>Action Required: Subscription Payment Failed ⚠️</h2>
    <p>Hi there,</p>
    <p>We were unable to process the automatic renewal for your store <strong>{storeName}</strong>.</p>
    
    <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
      <p style={{ margin: 0, fontWeight: 'bold' }}>Grace Period Activated</p>
      <p style={{ margin: '10px 0 0 0' }}>You have <strong>{daysRemaining} day(s)</strong> left to update your payment method.</p>
      <p style={{ margin: '5px 0 0 0' }}>If payment is not received by <strong>{gracePeriodEnds}</strong>, your store will be downgraded to the Free plan.</p>
    </div>

    <p>Please log in to your dashboard and update your subscription to avoid any interruption to your store's features.</p>
    
    <a href={loginUrl} style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '12px 24px', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', marginTop: '10px' }}>
      Go to Dashboard
    </a>
    
    <p style={{ marginTop: '30px' }}>Cheers,<br/>The Kozura Team</p>
  </div>
);
