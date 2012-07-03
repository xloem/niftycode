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
 [/(\w)\?\(/g, "$1_predicate\("]
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
  var s = document.createElement('script');
  s.setAttribute( 'language', language.replace(isnc, 'javascript') );
  s.text = denifty(e.text);
  s.type = e.type;
  //e.setAttribute( 'language', language.replace(isnc, 'javascript') );
  //e.text = denifty(e.text);
  //e.type = 'text/javascript';
  var sib = e.nextSibling;
  var parent = e.parentNode;
  parent.removeChild(e);
  parent.insertBefore(s, sib);
  //parent.insertBefore(e, sib);
  //var s = document.createElement('script');
  //s.type = 'text/javascript';
  //s.text = e.text;
  //parent.appendChild(s);
 }

 if (document.body.getAttribute('niftyonload')) {
  var str = denifty(document.body.getAttribute('niftyonload'));
  document.body.removeAttribute('niftyonload');
  //document.body.setAttribute('onload', new Function(str) )
  document.body.onload = new Function('event', str);
 }
})();
