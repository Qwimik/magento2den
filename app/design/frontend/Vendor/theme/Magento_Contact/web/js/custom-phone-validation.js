define(["jquery", "jquery/ui"], function ($) {
    $.widget("Magento_Catalog.customPhoneValidation", {
        options: {
            phoneFieldId: null,
        },

        _create: function () {
            this.options.phoneField = $("#" + this.options.phoneFieldId);
            this._bind();
        },

        _bind: function () {
            this.options.phoneField.on("keyup", () => this._validatePhone());
        },

        _validatePhone: function () {
            const phoneNumber = this.options.phoneField.val();

            // Логіка валідації номера телефону
            const isValidPhone = validatePhoneNumber(phoneNumber);

            // Застосування класу помилки, якщо валідація не пройшла
            if (!isValidPhone) {
                this.options.phoneField.addClass("mage-error");
                $(".action.submit.primary").attr('disabled', true);
            } else {
                this.options.phoneField.removeClass("mage-error");
                $(".action.submit.primary").attr("disabled", false);
            }
        },
    });

    return $.Magento_Catalog.customPhoneValidation;
});

function validatePhoneNumber(phoneNumber) {
    const validOperators = ["097", "096", "068", "050", "095"];
    const operatorCode = phoneNumber.substring(0, 3);

    if (!validOperators.includes(operatorCode)) {
        return false;
    }

    if (phoneNumber.length !== 10) {
        return false;
    }

    const numericPart = phoneNumber.replace(/[^0-9]/g, "");

    return numericPart.length === 10;
}