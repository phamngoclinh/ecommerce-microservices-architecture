module.exports = {
	apps: [
		{
			name: 'api-gateway',
			script: 'dist/apps/api-gateway/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture/apps/api-gateway',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
        NODE_ENV: 'production',
        API_GATEWAY_APP_PORT: 4001
			},
		},
		{
			name: 'catalog-service',
			script: 'dist/apps/catalog-service/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture/apps/catalog-service',
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
			script: 'dist/apps/inventory-service/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture/apps/inventory-service',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
        NODE_ENV: 'production',
        CATALOG_DB_DATABASE: '/var/www/ecommerce/ecommerce-microservices-architecture/data/inventory_db.sqlite',
        CATALOG_APP_PORT: 4003,
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379
			},
		},
		{
			name: 'notification-service',
			script: 'dist/apps/notification-service/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture/apps/notification-service',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
        NODE_ENV: 'production',
        CATALOG_DB_DATABASE: '/var/www/ecommerce/ecommerce-microservices-architecture/data/notification_db.sqlite',
        CATALOG_APP_PORT: 4006,
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379
			},
		},
		{
			name: 'order-service',
			script: 'dist/apps/order-service/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture/apps/order-service',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
        NODE_ENV: 'production',
        CATALOG_DB_DATABASE: '/var/www/ecommerce/ecommerce-microservices-architecture/data/order_db.sqlite',
        CATALOG_APP_PORT: 4004,
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379
			},
		},
		{
			name: 'payment-service',
			script: 'dist/apps/payment-service/main.js',
			cwd: '/var/www/ecommerce/ecommerce-microservices-architecture/apps/payment-service',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
        NODE_ENV: 'production',
        CATALOG_DB_DATABASE: '/var/www/ecommerce/ecommerce-microservices-architecture/data/payment_db.sqlite',
        CATALOG_APP_PORT: 4005,
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379
			},
		},
	],
};

