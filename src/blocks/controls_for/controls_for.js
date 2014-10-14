'use strict';
/* global Blockly, RoboBlocks */
/* jshint sub:true */

  /**
  * controls_for code generation
  * @return {String} Code generated with block parameters
  */

Blockly.Arduino.controls_for = function() {
    var variable0 = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    variable0=variable0.substring(0,variable0.length-1);
  
    var argument0 = Blockly.Arduino.valueToCode(this, 'FROM',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var argument1 = Blockly.Arduino.valueToCode(this, 'TO',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,'\'' + this.id + '\'') + branch;
    }
    var code;
    if (argument0.match(/^-?\d+(\.\d+)?$/) && argument1.match(/^-?\d+(\.\d+)?$/)) {
      // Both arguments are simple numbers.
        var up = parseFloat(argument0) <= parseFloat(argument1);
        code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
            variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
            variable0 + (up ? '++' : '--') + ') {\n' +
            branch + '}\n';
    } else {
        code = '';
        // Cache non-trivial values to variables to prevent repeated look-ups.
        var startVar = argument0;
        if (!argument0.match(/^\w+$/) && !argument0.match(/^-?\d+(\.\d+)?$/)) {
            startVar = Blockly.Arduino.variableDB_.getDistinctName(variable0 + '_start', Blockly.Variables.NAME_TYPE);
            code += 'int ' + startVar + ' = ' + argument0 + ';\n';
        }
        var endVar = argument1;
        if (!argument1.match(/^\w+$/) && !argument1.match(/^-?\d+(\.\d+)?$/)) {
            endVar = Blockly.Arduino.variableDB_.getDistinctName(variable0 + '_end', Blockly.Variables.NAME_TYPE);
            code += 'int ' + endVar + ' = ' + argument1 + ';\n';
        }
        code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
            '    (' + startVar + ' <= ' + endVar + ') ? ' +
              variable0 + ' <= ' + endVar + ' : ' +
              variable0 + ' >= ' + endVar + ';\n' +
              '    ' + variable0 + ' += (' + startVar + ' <= ' + endVar +
                  ') ? 1 : -1) {\n' +
              branch + '}\n';
    }
    return code;
};


Blockly.Blocks.controls_for = {
  // For loop.
    category: RoboBlocks.LANG_CATEGORY_CONTROLS,
    helpUrl: RoboBlocks.GITHUB_SRC_URL+'blocks/controls_for',
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
        this.appendDummyInput()
            .appendField(RoboBlocks.LANG_CONTROLS_FOR_INPUT_WITH)
            .appendField(new Blockly.FieldVariable(null), 'VAR');
        this.appendValueInput('FROM')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(RoboBlocks.LANG_CONTROLS_FOR_INPUT_FROM);
        this.appendValueInput('TO')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(RoboBlocks.LANG_CONTROLS_FOR_INPUT_TO);
        this.appendStatementInput('DO')
            .appendField(RoboBlocks.LANG_CONTROLS_FOR_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            return RoboBlocks.LANG_CONTROLS_FOR_TOOLTIP.replace('%1',
            thisBlock.getFieldValue('VAR'));
        });
    },
    getVars: function() {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};
