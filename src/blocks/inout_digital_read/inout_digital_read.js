'use strict';
/* global Blockly, JST, RoboBlocks */
/* jshint sub:true */
/**
 * inout_digital_read code generation
 * @return {String} Code generated with block parameters
 */
Blockly.Arduino.inout_digital_read = function() {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var code = '';
    if (this.childBlocks_ !== undefined && this.childBlocks_.length>=1) {
        var pin_block=[];
        for (var i in this.childBlocks_){
            if (this.childBlocks_[i].type==='variables_get' || this.childBlocks_[i].type==='math_number'){
                pin_block.push(this.childBlocks_[i].type);
            }
        }
        if (pin_block[0] === 'variables_get') {
            code += JST['inout_digital_read_setups']({
                'dropdown_pin': dropdown_pin,
            });
        } else if (pin_block[0] === 'math_number') {
            Blockly.Arduino.setups_['setup_green_digital_read' + dropdown_pin] = JST['inout_digital_read_setups']({
                'dropdown_pin': dropdown_pin,
            });
        }
    } else {
        Blockly.Arduino.setups_['setup_green_digital_read' + dropdown_pin] = JST['inout_digital_read_setups']({
            'dropdown_pin': dropdown_pin,
        });
    }
    code += JST['inout_digital_read']({
        'dropdown_pin': dropdown_pin,
    });
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/**
 * inout_digital_read block definition
 * @type {Object}
 */
Blockly.Blocks.inout_digital_read = {
    category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
    helpUrl: RoboBlocks.GITHUB_SRC_URL + 'blocks/inout_digital_read',
    /**
     * inout_digital_read initialization
     */
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
        this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ'));
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP'));
    }
};