niftycode
=========

A simple set of regexes make c-style code Better in advance.  Inspired by Ruby,
Scheme, D, ECMAScript, other stuff.

why?
====

There are some high-level languages that have some really simple and convenient
but nonstandard syntax sugar.  Let's give some of that sugar to _all_ c-style
languages!

niftycode is just a list of regexes.  This makes it useful in a wide variety of
environments.
Intended targets include:
 - c
 - c++
 - actionscript
 - javascript
 - java
 - haXe
and anything else that uses semicolons, braces, and parentheses in a consistent
way!

what, precisely?
================

This project shall include simple syntax or token enhancements to encourage
code which is easier, more beautiful, and more consistent both to write and to
read.

The enhancements are preprocessed via a list of regular expression
replacements.  This allows processors to easily be generated in a large variety
of languages.

0.1
=============

scheme/ruby -style symbolic naming conventions
----------------------------------------------

'!' and '?' become legal tokens postfixing a function name, transformed into
'_mutator' and '_predicate' respectively.

These have been traditionally used to indicate 'dangerous' e.g. mutating
functions, and those that return boolean values.  They can quickly indicate to
the user the nature of a function, and make for quickly distinguishing between
very similar functions that differ only in what they return.

### For example, C++
	class Vector2 {
	public:
		Vector2(float x, float y) : x(x), y(y) {}

		// Mutation form of summation
		void sum!(const Vector2 & v)
		{
			x += v.x; y += v.y;
		}

		// Functional form of summation
		Vector2 sum(const Vector2 & v) const
		{
			return Vector2(x + v.x, y + v.y);
		}

		// Predicate form of summation
		bool sum?(const Vector2 & v1, const Vector2 & v2) const
		{
			return v1.x + v2.x == x && v1.y + v2.y == y;
		}

	private:
		float x, y;
	};

how?
====

definition/ includes a file of regular expressions for each modification

generate.sh processes these files into the scripts in bin/

bin/nifty will apply all changes to a given sourcefile, provided /usr/bin/sed

examples/ includes a javascript example

hard ideas
==========
These would be cool, but might involve radical assumption changes.

- D-style inline scope guards
- accessors, getters, setters
