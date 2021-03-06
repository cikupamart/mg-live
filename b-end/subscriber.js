var hostAndPort	= "103.131.17.206";
var topic 		= 'Mqtt-Kafka';
var options		= {
	// consumer group id
	groupId: 'kafka-node-group',
	// Auto commit config
	autoCommit: true,
	autoCommitIntervalMs: 5000,
	// The max wait time is the maximum amount of time in milliseconds to block waiting
	// if insufficient data is available at the time the request is issued, default 100ms
	fetchMaxWaitMs: 100,
	// This is the minimum number of bytes of messages that must be available
	// to give a response, default 1 byte
	fetchMinBytes: 1,
	// The maximum bytes to include in the message set for this partition.
	// This helps bound the size of the response.
	fetchMaxBytes: 1024 * 1024,
	// If set true, consumer will fetch message from the given offset in the payloads
	fromOffset: false,
	// If set to 'buffer', values will be returned as raw buffer objects.
	encoding: 'utf8',
	keyEncoding: 'utf8'
};

var kafka = require('kafka-node'),
    client = new kafka.Client(hostAndPort),
    consumer = new kafka.Consumer(client, [], options);

consumer.addTopics([
  { topic: topic, partition: 0, time: Date.now(), offset: 0}
], () => console.log("Topic " + topic +" added to consumer for listening"));

consumer.on('error', function (err) { console.log('error : ' + err); });
consumer.on('offsetOutOfRange', function (err) { console.log('offsetOutOfRange : ' + err); });

module.exports = {
  consume: consumer,
}