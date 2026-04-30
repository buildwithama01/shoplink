import * as React from 'react';

interface Props {
  storeName: string;
  loginUrl: string;
}

export const SubscriptionCancelledEmail: React.FC<Readonly<Props>> = ({
  storeName,
  loginUrl,
}) => (
  <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
    <h2 style={{ color: '#ef4444' }}>Subscription Downgraded</h2>
    <p>Hi there,</p>
    <p>Your subscription for <strong>{storeName}</strong> has been cancelled and your store has been downgraded to the Free plan.</p>
    
    <p>This happened because we were unable to process your renewal payment after the 7-day grace period, or because you requested a cancellation.</p>

    <p>Your store is still live, but any products or categories exceeding the Free plan limits have been hidden. You can restore your full limits at any time by upgrading your plan.</p>
    
    <a href={loginUrl} style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '12px 24px', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', marginTop: '10px' }}>
      Upgrade Plan
    </a>
    
    <p style={{ marginTop: '30px' }}>Cheers,<br/>The Kozura Team</p>
  </div>
);
