var Primus = require('primus');
var SerialPort = require('serialport').SerialPort;

var socket = new Primus.createSocket()('http://192.168.1.5:3000');

socket.write('Hello Server, I am a Client');

socket.on('data', function data(data) {
	console.log('PRINTED FROM CLIENT:', data);
});

port = new SerialPort('/dev/ttyAMA0', {
	baudrate: 115200,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false
});

port.on('close', function close() {
	console.log('port closed.');
});

port.on('error', function error(error) {
	console.log('Serial port error: ' + error);
});

commands = [];

commands[0] = new Uint8Array([0x40, 0x4b, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x8b, 0x0d]);
commands[1] = new Uint8Array([0x40, 0x49, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x89, 0x0d]);
commands[2] = new Uint8Array([0x40, 0x52, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x93, 0x0d]);