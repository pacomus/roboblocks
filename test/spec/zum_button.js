/* global describe, it, expect */
(function() {
	'use strict';

	var root = this;

	root.define([], function() {

		describe('In Roboblocks.Blocks.zum_button block', function () {

			it('generates expected default Arduino code', function () {
				expect( true ).to.equal( true );
				var bool = Blockly.Block.obtain(Blockly.mainWorkspace, 'zum_button');

				assert.equal(Blockly.Arduino.workspaceToCode(), '/***   Global variables   ***/\n\n/***   Function declaration   ***/\n\nvoid setup()\n{\n  pinMode(,INPUT_PULLUP);\n\n}\n\n\nvoid loop()\n{\n  digitalRead();\n\n}\n\n/***   Function definition   ***/\n');
			});
		});
	});

}).call( this );
