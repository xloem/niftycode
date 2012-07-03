/*
 * Intended be included at the tail of a document, this script file will process:
 *
 * - all inline scripts of the form <script language="niftyjavascript.*"></script>
 * - document.body.onload
 *
 * TODO: process other inline events
 */

(function() {
var NIFTYCODE_REPLACEMENTS = [
 [/(\w)\!\(/g, "$1_mutator\("],
 [/(\w)\?\(/g, "$1_predicate\("],
];
 var ncres = NIFTYCODE_REPLACEMENTS;
 function denifty(str) {
  for (var i = 0; i < ncres.length; ++ i)
   str = str.replace(ncres[i][0], ncres[i][1]);
  return str;
 }
 var isnc = /^niftyjavascript/;

 var elems = document.getElementsByTagName('script');
 for (var i = 0; i < elems.length; ++ i) {
  var e = elems[i];
  var language = e.getAttribute('language');
  if ( ! isnc.test(language) )
   continue;
  e.setAttribute( 'language', language.replace(isnc, 'javascript') );
  e.firstChild.data = denifty(e.firstChild.data);
 }

 document.body.setAttribute('onload', denifty(document.body.getAttribute('onload')));
})();
