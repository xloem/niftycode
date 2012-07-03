#!/bin/sh

SEDFILE=bin/nifty

# Create single sed script
{
	echo '#!/usr/bin/sed -nrf'
	ECHO '1h;1!H;${;g'
	cat definition/*.nc 
	echo 'p;}'
} > $SEDFILE
chmod 755 $SEDFILE

# Create javascript replacement array
{
	echo 'var NIFTYCODE_REPLACEMENTS = ['
	sed -ne's/\\\([0-9]\)/$\1/g; s/^s\(.\)\(.*[^\\]\)\1\(.*[^\\]\)\1\(.*\)$/\t[\/\2\/\4, "\3"]/p' $SEDFILE | sed '$!s/.*/&,/'
	echo '];'
} > bin/niftycode.js

# Create standalone javascript
cpp -P -C -I bin <<EOF > bin/niftyjavascript.js
/*
 * Intended be included at the tail of a document, this script file will process:
 *
 * - all inline scripts of the form <script language="niftyjavascript.*"></script>
 * - document.body.onload
 *
 * TODO: process other inline events
 */

(function() {

#include "niftycode.js"
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
		var sib = e.nextSibling;
		var parent = e.parentNode;
		parent.removeChild(e);
		parent.insertBefore(s, sib);
	}

	if (document.body.getAttribute('niftyonload')) {
		var str = denifty(document.body.getAttribute('niftyonload'));
		document.body.removeAttribute('niftyonload');
		//document.body.setAttribute('onload', new Function(str) )
		document.body.onload = new Function('event', str);
	}
})();
EOF
