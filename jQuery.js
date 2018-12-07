jQuery(function () {
    $(".input-field").each(function (element) {
            // e.preventDefault();
            let inputElement = $(this).children("input");
            let errorElement = $(this).children(".error");

            inputElement.on('input', function (input) {
                inputElement.val() === '' ? errorElement.show() : errorElement.hide();
            });

        // console.log(this);
    });
});