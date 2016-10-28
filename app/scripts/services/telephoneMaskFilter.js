angular.module('utils').filter('telephoneMask', function () {
    return function (tel) {
        if (!tel) {
            return '';
        }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var city, number1, number2;

        switch (value.length) {
            case 10: // (PP) ####-#####
                city = value.slice(0, 2);
                number1 = value.slice(2, 6);
                number2 = value.slice(6);
                break;

            case 11: // (PP) #####-####
                city = value.slice(0, 2);
                number1 = value.slice(2, 7);
                number2 = value.slice(7);
                break;

            default:
                return tel;
        }

        return (' (' + city + ')' + number1 + '-' + number2);
    };
});
