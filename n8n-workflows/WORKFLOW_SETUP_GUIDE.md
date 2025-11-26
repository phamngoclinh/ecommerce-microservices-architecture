# Order Delivery Expiry Summary - n8n Workflow Setup Guide

## Overview
This workflow automatically monitors orders and sends daily summaries of orders that have expired or are about to expire delivery dates.

## How to Create in n8n UI

### Step 1: Access n8n
1. Go to http://localhost:5678
2. Log in with your credentials

### Step 2: Create New Workflow
1. Click **+ New** button
2. Give it a name: **"Order Delivery Expiry Summary"**
3. Set description: **"Daily workflow to summarize orders that have expired delivery time and send notifications"**

### Step 3: Add Nodes

#### Node 1: Schedule Trigger
1. Click **+** to add a node
2. Search for and select **Cron** (Schedule nodes)
3. Configure:
   - **Trigger Type**: Every Day
   - **Timezone**: Asia/Ho_Chi_Minh
   - Position: Start node

#### Node 2: Set Parameters
1. Add a **Set** node
2. Configure:
   - **Mode**: Expression
   - **JSON Output**:
   ```json
   {
     "deliveryWindowDays": 7,
     "currentDate": "{{ $now.toFormat('yyyy-MM-dd HH:mm:ss') }}",
     "reportDate": "{{ $now.toFormat('yyyy-MM-dd') }}"
   }
   ```
3. Connect from Schedule Trigger

#### Node 3: Query Expired Orders
1. Add a **PostgreSQL** node
2. Configure:
   - **Connection**: Your order-service database
   - **Query Type**: Execute Query
   - **SQL Query**:
   ```sql
   SELECT 
     o.id,
     o.status,
     o.created_at,
     o.total_amount,
     DATETIME(o.created_at, '+7 days') as expected_delivery_date,
     CASE 
       WHEN o.status = 'SHIPPED' AND DATETIME(o.created_at, '+7 days') < DATETIME('now') THEN 'EXPIRED'
       WHEN o.status = 'SHIPPED' AND DATETIME(o.created_at, '+7 days') BETWEEN DATETIME('now', '-1 day') AND DATETIME('now') THEN 'EXPIRING_SOON'
       ELSE 'ON_TIME'
     END as delivery_status
   FROM orders o
   WHERE o.status IN ('SHIPPED', 'PENDING', 'CONFIRMED')
   ORDER BY o.created_at DESC
   ```
3. Connect from Set Parameters

#### Node 4: Summarize Data
1. Add a **Code** node
2. Configure:
   - **Language**: JavaScript
   - **Code**:
   ```javascript
   const orders = items[0].json.records || [];
   const expired = orders.filter(o => o.delivery_status === 'EXPIRED');
   const expiringSoon = orders.filter(o => o.delivery_status === 'EXPIRING_SOON');
   const shipped = orders.filter(o => o.status === 'SHIPPED');
   
   const summary = {
     reportDate: items[0].json.reportDate,
     generatedAt: new Date().toISOString(),
     totalShipped: shipped.length,
     totalExpired: expired.length,
     totalExpiringSoon: expiringSoon.length,
     expiredOrderIds: expired.map(o => o.id),
     expiringSoonOrderIds: expiringSoon.map(o => o.id),
     totalExpiredAmount: expired.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0),
     totalExpiringSoonAmount: expiringSoon.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0),
     expiredOrders: expired,
     expiringSoonOrders: expiringSoon
   };
   
   return [{ json: summary }];
   ```
3. Connect from Query Expired Orders

#### Node 5: Check Report Status
1. Add a **Switch** node
2. Configure three routing conditions:
   
   **Route 1 - Has Expired**:
   - Condition: `totalExpired > 0`
   - Output Key: "Has Expired"
   
   **Route 2 - Has Expiring Soon**:
   - Condition: `totalExpiringSoon > 0`
   - Output Key: "Has Expiring Soon"
   
   **Route 3 - All Clear**:
   - Condition: `totalExpired <= 0 AND totalExpiringSoon <= 0`
   - Output Key: "All Clear"

3. Connect from Summarize Data

#### Node 6: Prepare Alert Email
1. Add a **Set** node
2. Configure:
   - **Mode**: Expression
   - **JSON Output**:
   ```json
   {
     "subject": "[ALERT] Expired Order Deliveries - {{ $json.reportDate }}",
     "htmlContent": "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'><div style='background: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0;'><h2 style='margin: 0;'>⚠️ Expired Order Deliveries Alert</h2></div><div style='background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;'><p><strong>Report Date:</strong> {{ $json.reportDate }}</p><p><strong>Generated:</strong> {{ $json.generatedAt }}</p><div style='background: #fee2e2; border-left: 4px solid #dc2626; padding: 12px; margin: 16px 0; border-radius: 4px;'><h3 style='margin: 0 0 8px 0; color: #991b1b;'>Expired Orders (Past Delivery Date)</h3><p style='margin: 0; font-size: 18px; font-weight: bold;'>{{ $json.totalExpired }} orders</p><p style='margin: 8px 0 0 0; color: #7f1d1d;'>Total Amount: {{ ($json.totalExpiredAmount).format('vi-VN') }} VND</p><p style='margin: 8px 0 0 0; font-size: 12px;'>Order IDs: {{ $json.expiredOrderIds.join(', ') }}</p></div><div style='background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 16px 0; border-radius: 4px;'><h3 style='margin: 0 0 8px 0; color: #92400e;'>Expiring Soon (Within 24 hours)</h3><p style='margin: 0; font-size: 18px; font-weight: bold;'>{{ $json.totalExpiringSoon }} orders</p><p style='margin: 8px 0 0 0; color: #b45309;'>Total Amount: {{ ($json.totalExpiringSoonAmount).format('vi-VN') }} VND</p></div><div style='background: #f0fdf4; border-left: 4px solid #16a34a; padding: 12px; margin: 16px 0; border-radius: 4px;'><h3 style='margin: 0 0 8px 0; color: #15803d;'>Shipped Orders Summary</h3><p style='margin: 0; font-size: 18px; font-weight: bold;'>{{ $json.totalShipped }} orders shipped</p></div></div><div style='background: #f3f4f6; padding: 12px; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280;'><p style='margin: 0;'>eShop Order Management System</p></div></div>",
     "toEmail": "admin@eshop.local,ops@eshop.local"
   }
   ```
3. Connect from Routes 1 & 2 of Check Report Status

#### Node 7: Prepare Clear Email
1. Add a **Set** node
2. Configure:
   - **Mode**: Expression
   - **JSON Output**:
   ```json
   {
     "subject": "Daily Order Status Report - {{ $json.reportDate }}",
     "htmlContent": "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'><div style='background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0;'><h2 style='margin: 0;'>✓ Daily Order Status Report</h2></div><div style='background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;'><p><strong>Report Date:</strong> {{ $json.reportDate }}</p><p><strong>Generated:</strong> {{ $json.generatedAt }}</p><div style='background: #d1fae5; border-left: 4px solid #10b981; padding: 12px; margin: 16px 0; border-radius: 4px;'><h3 style='margin: 0 0 8px 0; color: #065f46;'>All Clear ✓</h3><p style='margin: 0;'>No expired or expiring-soon orders detected.</p><p style='margin: 8px 0 0 0; font-size: 12px;'>Total Shipped: {{ $json.totalShipped }} orders</p></div></div><div style='background: #f3f4f6; padding: 12px; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280;'><p style='margin: 0;'>eShop Order Management System</p></div></div>",
     "toEmail": "ops@eshop.local"
   }
   ```
3. Connect from Route 3 of Check Report Status

#### Node 8: Send Alert Email
1. Add an **HTTP Request** node
2. Configure:
   - **Method**: POST
   - **URL**: http://host.docker.internal:4001/notifications/send-email
   - **Headers**:
     ```
     Content-Type: application/json
     ```
   - **Body** (Send as JSON):
     ```json
     {
       "subject": "{{ $json.subject }}",
       "message": "{{ $json.htmlContent }}",
       "to": "{{ $json.toEmail }}"
     }
     ```
3. Connect from Prepare Alert Email

#### Node 9: Send Clear Email
1. Add an **HTTP Request** node (duplicate Node 8)
2. Same configuration as Node 8
3. Connect from Prepare Clear Email

### Step 4: Save & Activate
1. Click **Save** button
2. Toggle **Active** to ON
3. Click **Save** again

### Step 5: Test the Workflow
1. Click **Execute Workflow** button
2. Check the execution logs
3. Verify emails are being sent (check notification service logs)

## Configuration Notes

### Email Recipients
- **Alert emails**: admin@eshop.local, ops@eshop.local
- **Clear emails**: ops@eshop.local

Update these in the Set nodes if needed.

### Delivery Window
Default delivery window is **7 days** from order creation date.
To change, modify this line in the SQL query:
```sql
DATETIME(o.created_at, '+7 days')  -- Change 7 to your desired days
```

### Database Connection
Ensure your PostgreSQL connection is configured with:
- **Host**: Your order-service database host
- **Port**: 5432 (or your configured port)
- **Database**: Your order database name
- **User**: Your database user
- **Password**: Your database password

### Notification Service
The workflow sends emails via HTTP POST to:
- **Endpoint**: http://host.docker.internal:4001/notifications/send-email
- **Method**: POST
- **Headers**: Content-Type: application/json
- **Body Parameters**: subject, message, to

## Troubleshooting

### Workflow doesn't trigger
- Check the Cron schedule configuration
- Ensure the timezone is set to Asia/Ho_Chi_Minh
- Verify n8n service is running

### No data returned from database
- Test the SQL query directly in your database
- Verify PostgreSQL credentials
- Check if orders table exists and has data

### Emails not sent
- Verify notification service is running at http://host.docker.internal:4001
- Check email service configuration
- Review n8n execution logs for errors

### Database connection errors
- Verify PostgreSQL credentials
- Test connection using psql command
- Check firewall/network connectivity

## Workflow Structure
```
Schedule Trigger
  ↓
Set Parameters
  ↓
Query Expired Orders (PostgreSQL)
  ↓
Summarize Data (JavaScript Code)
  ↓
Check Report Status (Switch)
  ├─→ Route 1 (Has Expired) → Prepare Alert Email → Send Alert Email
  ├─→ Route 2 (Expiring Soon) → Prepare Alert Email → Send Alert Email
  └─→ Route 3 (All Clear) → Prepare Clear Email → Send Clear Email
```

## File Reference
- Workflow definition: `/n8n-workflows/order-expiry-summary.workflow.json`
- Setup guide: `/WORKFLOW_SETUP_GUIDE.md`
