var config = {};
config.database = {
	host: '127.0.0.1',
	port: '27017',
	name: 'web-deprecation'
}
config.api = {
	port: 1337,
	allow: ['http://localhost']
}

module.exports = config;