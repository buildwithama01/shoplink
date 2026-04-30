import * as React from 'react';

interface Props {
  storeName: string;
  planName: string;
  amount: string;
  nextBillingDate: string;
}

export const SubscriptionUpgradeEmail: React.FC<Readonly<Props>> = ({
  storeName,
  planName,
  amount,
  nextBillingDate,
}) => (
  <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
    <h2>Plan Upgrade Successful! 🎉</h2>
    <p>Hi there,</p>
    <p>Great news! Your store <strong>{storeName}</strong> has been successfully upgraded to the <strong>{planName}</strong> plan.</p>
    
    <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
      <p style={{ margin: 0 }}><strong>Amount Paid:</strong> {amount}</p>
      <p style={{ margin: '10px 0 0 0' }}><strong>Next Billing Date:</strong> {nextBillingDate}</p>
    </div>

    <p>Your new limits and features are already active. Head over to your dashboard to make the most out of your new plan!</p>
    
    <p>Cheers,<br/>The Kozura Team</p>
  </div>
);
