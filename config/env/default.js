'use strict';


module.exports = {
	app: {
		title: 'Marketplace Hub',
		description: 'Hub for F2 apps',
		keywords: 'F2, hub, marketplace, registry',
		googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};
