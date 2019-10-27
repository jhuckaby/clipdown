#!/usr/bin/env node

// clipdown
// Convert rich HTML to Markdown in your clipboard.
// Currently only works on macOS.
// Copyright (c) 2019 Joseph Huckaby, PixlCore.com, MIT Licensed

const fs = require('fs');
const os = require('os');
const cp = require('child_process');
const breakdance = require('breakdance');
const sanitizeHTML = require('sanitize-html');

if (os.platform() !== 'darwin') {
	throw new Error("Sorry, this tool only works on macOS.");
}

const Args = require('pixl-args');
var args = (new Args({})).get();

const PBCOPY_BIN = '/usr/bin/pbcopy';
const OSASCRIPT_BIN = '/usr/bin/osascript';

process.chdir( __dirname );

// first, get clipboard contents as hex-encoded HTML
cp.exec( OSASCRIPT_BIN + ` -e 'the clipboard as "HTML"'`, function(err, stdout, stderr) {
	if (err) throw err;
	
	// extract HTML and decode
	if (!stdout.match(/data HTML([0-9A-F]+)/)) {
		throw new Error("Error: Did not find any HTML in your clipboard.");
	}
	
	var hex = RegExp.$1;
	var html = Buffer.from(hex, 'hex').toString();
	var shtml = sanitizeHTML(html, {});
	var md = breakdance(shtml, args).trim();
	
	if (args.debug) {
		console.log( "Raw HTML: " + html + "\n" );
		console.log( "Sanitized HTML: " + shtml + "\n" );
		console.log( "Markdown: " + md + "\n" );
		process.exit(0);
	}
	
	var child = null;
	var child_cmd = PBCOPY_BIN;
	var child_args = [];
	var child_opts = { 
		stdio: ['pipe', 'ignore', 'ignore']
	};
	
	// spawn child
	try {
		child = cp.spawn( child_cmd, child_args, child_opts );
	}
	catch (err) {
		throw new Error("Error: Could not execute command: " + child_cmd + ": " + err);
	}
	
	child.on('error', function (err) {
		// child error
		throw new Error("Error: Could not execute command: " + child_cmd + ": " + err);
	} );
	
	child.on('exit', function (code, signal) {
		// child exited
		process.exit(0);
	});
	
	if (child.stdin) {
		child.stdin.write( md );
	}
	child.stdin.end();
	
}); // osascript
