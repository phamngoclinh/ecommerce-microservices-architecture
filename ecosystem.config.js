module.exports = {
	apps: [
		{
			name: 'api-gateway',
			script: 'api-gateway/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
        NODE_ENV: 'production',
        API_GATEWAY_APP_PORT: 4001
			},
		},
		{
			name: 'catalog-service',
			script: 'catalog-service/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
        NODE_ENV: 'production',
        CATALOG_DB_DATABASE: '/var/www/ecommerce/ecommerce-microservices-architecture/data/catalog_db.sqlite',
        CATALOG_APP_PORT: 4002,
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379
			},
		},
		{
			name: 'inventory-service',
			script: 'inventory-service/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
        NODE_ENV: 'production',
        INVENTORY_DB_DATABASE: '/var/www/ecommerce/ecommerce-microservices-architecture/data/inventory_db.sqlite',
        INVENTORY_APP_PORT: 4003,
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379
			},
		},
		{
			name: 'order-service',
			script: 'order-service/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
        NODE_ENV: 'production',
        ORDER_DB_DATABASE: '/var/www/ecommerce/ecommerce-microservices-architecture/data/order_db.sqlite',
        ORDER_APP_PORT: 4004,
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379
			},
		},
		{
			name: 'payment-service',
			script: 'payment-service/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
        NODE_ENV: 'production',
        PAYMENT_DB_DATABASE: '/var/www/ecommerce/ecommerce-microservices-architecture/data/payment_db.sqlite',
        PAYMENT_APP_PORT: 4005,
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379
			},
    },
    {
			name: 'notification-service',
			script: 'notification-service/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
        NODE_ENV: 'production',
        NOTIFICATION_DB_DATABASE: '/var/www/ecommerce/ecommerce-microservices-architecture/data/notification_db.sqlite',
        NOTIFICATION_APP_PORT: 4006,
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379
			},
		},
	],
};

