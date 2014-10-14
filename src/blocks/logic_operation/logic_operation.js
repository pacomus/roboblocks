'use strict';
/* global Blockly, JST, RoboBlocks */

/**
  * logic_operation code generation
  * @return {String} Code generated with block parameters
  */

Blockly.Arduino.logic_operation = function() {
    // Operations 'and', 'or'.
    var operator = (this.getFieldValue('OP') === 'AND') ? '&&' : '||';
    var order = (operator === '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND :
        Blockly.Arduino.ORDER_LOGICAL_OR;
    var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
    var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';
    var code = JST ['logic_operation']({
        'operator':operator,
        'argument0':argument0,
        'argument1':argument1
    });
    return [code, order];
};


Blockly.Blocks.logic_operation = {
    // Logical operations: 'and', 'or'.
    category: RoboBlocks.LANG_CATEGORY_LOGIC,
    helpUrl: RoboBlocks.GITHUB_SRC_URL+'blocks/logic_operation',
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
        this.setOutput(true, Boolean);
        this.appendValueInput('A')
            .setCheck(Boolean);
        this.appendValueInput('B')
            .setCheck(Boolean)
            .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            var op = thisBlock.getFieldValue('OP');
            return Blockly.Blocks.logic_operation.TOOLTIPS[op];
        });
    }
};

Blockly.Blocks.logic_operation.OPERATORS =
    [[RoboBlocks.LANG_LOGIC_OPERATION_AND, 'AND'],
     [RoboBlocks.LANG_LOGIC_OPERATION_OR, 'OR']];

Blockly.Blocks.logic_operation.TOOLTIPS = {
    AND: RoboBlocks.LANG_LOGIC_OPERATION_TOOLTIP_AND,
    OR: RoboBlocks.LANG_LOGIC_OPERATION_TOOLTIP_OR
};