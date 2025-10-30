module.exports = {
	apps: [
		{
			name: 'api-gateway',
			script: 'dist/apps/api-gateway/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
      exec_mode: 'cluster',
      namespace: "ecommerce-microservices",
			env_production: {
        NODE_ENV: 'production',
        API_GATEWAY_APP_PORT: 4001,
        API_GATEWAY_CATALOG_SERVICE_URL: 'http://localhost:4002',
        API_GATEWAY_INVENTORY_SERVICE_URL: 'http://localhost:4003',
        API_GATEWAY_ORDER_SERVICE_URL: 'http://localhost:4004',
        API_GATEWAY_PAYMENT_SERVICE_URL: 'http://localhost:4005',
        API_GATEWAY_NOTIFICATION_SERVICE_URL: 'http://localhost:4006',
			},
		},
		{
			name: 'catalog-service',
			script: 'dist/apps/catalog-service/apps/catalog-service/src/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
      exec_mode: 'cluster',
      namespace: "ecommerce-microservices",
			env_production: {
        NODE_ENV: 'production',
        CATALOG_DB_DATABASE: '/var/www/ecommerce/data/catalog_db.sqlite',
        CATALOG_APP_PORT: 4002,
        NATS_HOST: 'nats://localhost:4222'
			},
		},
		{
			name: 'inventory-service',
			script: 'dist/apps/inventory-service/apps/inventory-service/src/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
			exec_mode: 'cluster',
      namespace: "ecommerce-microservices",
			env_production: {
        NODE_ENV: 'production',
        INVENTORY_DB_DATABASE: '/var/www/ecommerce/data/inventory_db.sqlite',
        INVENTORY_APP_PORT: 4003,
        NATS_HOST: 'nats://localhost:4222'
			},
		},
		{
			name: 'order-service',
			script: 'dist/apps/order-service/apps/order-service/src/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
			exec_mode: 'cluster',
      namespace: "ecommerce-microservices",
			env_production: {
        NODE_ENV: 'production',
        ORDER_DB_DATABASE: '/var/www/ecommerce/data/order_db.sqlite',
        ORDER_APP_PORT: 4004,
        ORDER_PAYMENT_SERVICE_URL: 'http://localhost:4003',
        NATS_HOST: 'nats://localhost:4222'
			},
		},
		{
			name: 'payment-service',
			script: 'dist/apps/payment-service/apps/payment-service/src/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
			exec_mode: 'cluster',
      namespace: "ecommerce-microservices",
			env_production: {
        NODE_ENV: 'production',
        PAYMENT_DB_DATABASE: '/var/www/ecommerce/data/payment_db.sqlite',
        PAYMENT_APP_PORT: 4005,
        PAYMENT_PROVIDER_URL: 'http://localhost:4005',
        NATS_HOST: 'nats://localhost:4222'
			},
    },
    {
			name: 'notification-service',
			script: 'dist/apps/notification-service/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
			exec_mode: 'cluster',
      namespace: "ecommerce-microservices",
			env_production: {
        NODE_ENV: 'production',
        NOTIFICATION_DB_DATABASE: '/var/www/ecommerce/data/notification_db.sqlite',
        NOTIFICATION_APP_PORT: 4006,
        NATS_HOST: 'nats://localhost:4222'
			},
		},
	],
};

