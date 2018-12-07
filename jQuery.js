function isNormalInteger(str) {
    return /^([1-9]\d*)$/.test(str);
}

function validateAllInputBy(className, validationFunc) {
    $(".validated-field").each(function (element) {
        let inputElement = $(this).children(`input[class=${className}]`);
        let errorElement = $(this).children(".error");

        inputElement.on('input', function () {
            validationFunc(inputElement.val()) ? errorElement.hide() : errorElement.show();
        });
    });
}

jQuery(function () {
    validateAllInputBy('mandatory', (value) => value); // empty strings are falsy
    validateAllInputBy('integer', (value) => isNormalInteger(value));
    validateAllInputBy('date', (value) => Date.parse(value));
});