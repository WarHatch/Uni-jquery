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

function ObjectifyArray(arr) {
    var returnArray = {};
    for (var i = 0; i < arr.length; i++){
        returnArray[arr[i]['name']] = arr[i]['value'];
    }
    return returnArray;
}

async function ajaxPost(data) {
    return $.ajax({
        url: "https://api.myjson.com/bins",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            return data;
        }
    })
}

function UpdateTable(data) {
    const { name, age, date } = data;

    $('#name').text(name);
    $('#age').text(age);
    $('#date').text(new Date(date));
}

jQuery(function () {
    ValidateAllInputBy('mandatory', (value) => value); // empty strings are falsy
    ValidateAllInputBy('integer', (value) => IsNormalInteger(value));
    ValidateAllInputBy('date', (value) => Date.parse(value));

    $("h1").text(RemoveNegativeWords($("h1").text()));
    $("p").css("color", "grey");
    $("li:nth-child(2)").remove();
    $("#opinion-article").append('<p>There is nothing wrong here, continue with your business</p>');

    $('#userForm').submit(function (e) { 
        e.preventDefault();

        if ($('.error:visible').length === 0)
        {
            const formValues = ObjectifyArray($('#userForm :input[name]'));

            ajaxPost(formValues).then((response) => {
                const apiUri = response.uri;
                $.get(apiUri, function(data, textStatus, jqXHR) {
                    UpdateTable(data);
                });
            });
        }
        else alert("Cannot submit with incorrect input");
    });
});