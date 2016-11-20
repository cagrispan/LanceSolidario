/**
 * Created by Aliss on 11/08/2016.
 */
angular.module('lanceSolidario.user', [
    'lanceSolidario.user.userResource',
    'lanceSolidario.user.user'
]);

angular.module('lanceSolidario.product', [
    'lanceSolidario.product.productResource',
    'lanceSolidario.product.product'
]);

angular.module('lanceSolidario.auction', [
  'lanceSolidario.auction.auctionResource',
  'lanceSolidario.auction.auction'
]);

angular.module('lanceSolidario.address', [
    'lanceSolidario.address.addressResource',
    'lanceSolidario.address.address'
]);

angular.module('lanceSolidario.email', [
    'lanceSolidario.email.emailResource',
    'lanceSolidario.email.email'
]);

angular.module('lanceSolidario.telephone', [
    'lanceSolidario.telephone.telephoneResource',
    'lanceSolidario.telephone.telephone'
]);

angular.module('lanceSolidario.bid', [
    'lanceSolidario.bid.bidResource',
    'lanceSolidario.bid.bid'
]);

angular.module('lanceSolidario.image', [
    'lanceSolidario.image.imageResource',
    'lanceSolidario.image.image'
]);

angular.module('lanceSolidario.purchase', [
    'lanceSolidario.purchase.purchaseResource',
    'lanceSolidario.purchase.purchase'
]);

angular.module('lanceSolidario.institution', [
    'lanceSolidario.institution.institutionResource',
    'lanceSolidario.institution.institution'
]);

angular.module('utils',['lanceSolidario']);
