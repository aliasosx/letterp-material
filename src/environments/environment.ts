// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://letterp-api.local:5000/api/v1/',
  imageUrl: 'http://letterp-api.local:5000/images/uploads/foods/',
  userImageUrl: 'http://letterp-api.local:5000/images/uploads/users/',
  token: 'eyJhbGciOiJSUzI1NiJ9.YWRtaW58c2F5eWFsaW5oQGdtYWlsLmNvbQ.KukFudI0XS2hNBzeuXVpb0VQ1s30J8hd9d6aKhCnToOKEl-_QDICBlp1DNnGlcrddPmFkF5hDd_PkWcNmhB_og'

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
