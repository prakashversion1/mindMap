var console = require('vertx/console');
var eventBus = require('vertx/event_bus');
console.log('vertx instance started');
var mindMaps = {};
eventBus.registerHandler('mindmap.list',function(args,responder){
	responder({"mindMaps": Object.keys(mindMaps).map(function(key) {
		return mindMaps[key]; 
		})
	});
});
eventBus.registerHandler('mindMaps.save', function(mindMap,responder) {
	if (!mindMap._id) {
		mindMap._id = Math.random();
	}
	mindMaps[mindMap._id] = mindMap;
	responder(mindMap);
});
eventBus.registerHandler('mindMaps.delete', function(args,responder) {
	delete mindMaps[args.id];
	responder({});
});