const ValidationService         =   {
    
    rulesErrorGenerator : function (data, rules, rulesMsg=null) {
        let errors              =   null;
        let fields              =   Object.keys(rules);
        
        fields.forEach((field, index) => {
            let fieldRules          =   rules[field];
            let fieldRulesArray     =   fieldRules.split('|');
            let fieldData           =   (data && data != null && data[field]) ? data[field] : null;
            
            fieldRulesArray.forEach((fieldRule, ruleIndex) => {
                if(fieldRule === 'required') {
                    if(this.requiredValidation(fieldData, field)){
                        errors      =   {...errors, [field] : this.requiredValidationMsg(field, rulesMsg)};
                    }
                } else if(fieldRule === 'array') {
                    if(this.arrayValidation(fieldData, field)){
                        errors      =   {...errors, [field] : this.arrayValidationMsg(field, rulesMsg)};
                    }
                } else if(fieldRule === 'numeric') {
                    if(this.numericValidation(fieldData, field)){
                        errors      =   {...errors, [field] : this.numericValidationMsg(field, rulesMsg)};
                    }
                } else if(fieldRule === 'email') {
                    if(this.validateEmail(fieldData, field)){
                        errors      =   {...errors, [field] : this.validateEmailMsg(field, rulesMsg)};
                    }
                } else if(fieldRule.includes('digits:')) {
                    let digitalValidationNumber = fieldRule.split(':')[1] ? fieldRule.split(':')[1] : 1;
                    if(this.digitalValidation(fieldData, field, digitalValidationNumber)){
                        errors      =   {...errors, [field] : this.digitalValidationMsg(field, rulesMsg, digitalValidationNumber)};
                    }
                } else if(fieldRule.includes('min:')) {
                    let minimumValidationNumber = fieldRule.split(':')[1] ? fieldRule.split(':')[1] : 1;
                    if(this.minimumValidation(fieldData, field, minimumValidationNumber)){
                        errors      =   {...errors, [field] : this.minimumValidationMsg(field, rulesMsg, minimumValidationNumber)};
                    }
                } else if(fieldRule.includes('max:')) {
                    let maximumValidationNumber = fieldRule.split(':')[1] ? fieldRule.split(':')[1] : 1;
                    if(this.maximumValidation(fieldData, field, maximumValidationNumber)){
                        errors      =   {...errors, [field] : this.maximumValidationMsg(field, rulesMsg, maximumValidationNumber)};
                    }
                }
            });
        });
        
        return errors;
    },
    
    rulesFirstErrorGenerator : function (data, rules, rulesMsg=null) {
        return this.getFirstError(this.rulesErrorGenerator(data, rules, rulesMsg));
    },
    requiredValidation: function(fieldData, field) {
        let error               =   false;
        if(!fieldData || fieldData === null || fieldData === undefined || (typeof(fieldData) == 'string' && fieldData.trim() === '')) {
            error               =   true;
        }
        return error;
    },
    requiredValidationMsg: function(field, rulesMsg = null) {
        return rulesMsg && rulesMsg[field] && rulesMsg[field].required 
                ? rulesMsg && rulesMsg[field] && rulesMsg[field].required
                : field + ' is required';
    },
    arrayValidation: function(fieldData, field) {
        return !Array.isArray(fieldData);
    },
    arrayValidationMsg: function(field, rulesMsg = null) {
        return rulesMsg && rulesMsg[field] && rulesMsg[field].array 
                ? rulesMsg && rulesMsg[field] && rulesMsg[field].array
                : field + ' is not array';
    },
    numericValidation: function(fieldData, field) {
        const pattern           =   /^\d+$/;
        let error               =   false;
        if(fieldData && !pattern.test(fieldData)) {
            error               =   true;
        }
        return error;
    },
    numericValidationMsg: function(field, rulesMsg = null) {
        return rulesMsg && rulesMsg[field] && rulesMsg[field].numeric 
                ? rulesMsg && rulesMsg[field] && rulesMsg[field].numeric
                : field + ' is not numeric';
    },
    digitalValidation: function(fieldData, field, number) {
        let error               =   false;
        if(!fieldData || isNaN(fieldData) || fieldData.length != number) {
            error               =   true;
        }
        return error;
    },
    digitalValidationMsg: function(field, rulesMsg = null) {
        return rulesMsg && rulesMsg[field] && rulesMsg[field].digits 
                ? rulesMsg && rulesMsg[field] && rulesMsg[field].digits
                : field + ' is invalid';
    },
    validateEmail: function(fieldData, field) {
        const pattern           =    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        let error               =   false;
        if(fieldData && !pattern.test(fieldData)) {
            error               =   true;
        }
        return error;
    },
    validateEmailMsg: function(field, rulesMsg = null) {
        return rulesMsg && rulesMsg[field] && rulesMsg[field].numeric 
                ? rulesMsg && rulesMsg[field] && rulesMsg[field].numeric
                : field + ' is not a valid email';
    },
    minimumValidation: function(fieldData, field, number) {
        let error               =   false;
        if(fieldData && fieldData.length < number) {
            error               =   true;
        }
        return error;
    },
    minimumValidationMsg: function(field, rulesMsg = null, number = 1) {
        return rulesMsg && rulesMsg[field] && rulesMsg[field].min 
                ? rulesMsg && rulesMsg[field] && rulesMsg[field].min
                : field + ' should contain atleast '+number+' characters';
    },
    maximumValidation: function(fieldData, field, number) {
        let error               =   false;
        if(fieldData && fieldData.length > number) {
            error               =   true;
        }
        return error;
    },
    maximumValidationMsg: function(field, rulesMsg = null, number = 1) {
        return rulesMsg && rulesMsg[field] && rulesMsg[field].min 
                ? rulesMsg && rulesMsg[field] && rulesMsg[field].min
                : field + ' should contain max '+number+' characters';
    },
    
    getFirstError: function(errors) {
        if(errors && errors != null && Object.keys(errors) && Object.keys(errors)[0]) {
            return errors[Object.keys(errors)[0]]; 
        }
        return null;
    }
    
};

export default ValidationService;