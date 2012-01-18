var QUnit    = require('../test/qunit').QUnit,
    qunitTap = require('qunit-tap').qunitTap,
    util     = require('util'),
    fs       = require('fs'),
    Japan    = require('../japan.js');

qunitTap(QUnit, util.puts, {noPlan: true});

QUnit.init();
QUnit.config.updateRate = 0;

QUnit.test("５is 5", function() { QUnit.equal(Japan.toASCII('５'), '5'); });
QUnit.test("５is 5", function() { QUnit.equal(5, 5); });

QUnit.module('Common Era Conversions');

QUnit.test("５is 5",                             function() { QUnit.equal(Japan.toASCII('５'), '5'); });
QUnit.test("０１２３４５６７８９ is 0123456789", function() { QUnit.equal(Japan.toASCII('０１２３４５６７８９'), '0123456789'); });
QUnit.test("Jun 02, 1981 08:00:00 is 昭和56年",  function() { QUnit.equal(Japan.toCommonEraYear(new Date("Jun 02, 1981 08:00:00")),  '昭和56年'); });
QUnit.test("Feb 15, 1978 08:00:00 is 昭和53年",  function() { QUnit.equal(Japan.toCommonEraYear(new Date("Feb 15, 1978 08:00:00")), '昭和53年'); });
QUnit.test("Jan 07, 1989 00:00:00 is 昭和64年",  function() { QUnit.equal(Japan.toCommonEraYear(new Date("Jan 07, 1989 00:00:00")),  '昭和64年'); });
QUnit.test("Jan 08, 1989 00:00:00 is 平成元年",  function() { QUnit.equal(Japan.toCommonEraYear(new Date("Jan 08, 1989 00:00:00")),  '平成元年'); });
QUnit.test("昭和53年 is 1978",                   function() { QUnit.equal(Japan.toWesternYear('昭和53年'),     1978); });
QUnit.test("昭和五十三年 is 1978",               function() { QUnit.equal(Japan.toWesternYear('昭和五十三年'), 1978); });
QUnit.test("昭和十年 is 1935",                   function() { QUnit.equal(Japan.toWesternYear('昭和十年'),     1935); });
QUnit.test("昭和十一年 is 1936",                 function() { QUnit.equal(Japan.toWesternYear('昭和十一年'),   1936); });
QUnit.test("昭和５３年 is 1978",                 function() { QUnit.equal(Japan.toWesternYear('昭和５３年'),   1978); });
QUnit.test("明治元年 is 1868",                   function() { QUnit.equal(Japan.toWesternYear('明治元年'),     1868); });

QUnit.start();