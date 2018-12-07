function IsNormalInteger(str) {
    return /^([1-9]\d*)$/.test(str);
}

function ValidateAllInputBy(className, validationFunc) {
    $('.validated-field').each(function () {
        let inputElement = $(this).children(`input[class=${className}]`);
        let errorElement = $(this).children('.error');

        inputElement.on('input', function () {
            validationFunc(inputElement.val()) ? errorElement.hide() : errorElement.show();
        });
    });
}

function RemoveNegativeWords(str) {
    return str.replace(/despicable/g, 'amazing');
}

jQuery(function () {
    ValidateAllInputBy('mandatory', (value) => value); // empty strings are falsy
    ValidateAllInputBy('integer', (value) => IsNormalInteger(value));
    ValidateAllInputBy('date', (value) => Date.parse(value));
    
    $("h1").text(RemoveNegativeWords($("h1").text()));
    $("p").css("color", "grey");
    $("li:nth-child(2)").remove();
    $("#opinion-article").append('<p>There is nothing wrong here, continue with your business</p>');
});