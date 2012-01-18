(function(exports){
    'use strict';

    var Japan;

    if (!Japan) { Japan = {}; }

    Japan.calculateCommonEraYear = function(era, date) {
        var year = (date.getFullYear() - era.getFullYear() + 1);
        return (year === 1 ? '元' : year) + '年';
    };

    Japan.calculateWesternYear = function(era, year) {
        year = year === '元' ? 1 : exports.toASCII(year);
        return (parseInt(year, 10) + era.getFullYear()) - 1;
    };

    exports.toASCII = function(someJapanese) {
        var result    = 0,
        zenkaku       = "０１２３４５６７８９",
        kanji         = "〇一二三四五六七八九十",
        zenkakuRegExp = new RegExp("[" + zenkaku + "]", "g"),
        kanjiRegExp   = new RegExp("[" + kanji   + "]", "g");

        if (someJapanese.match(zenkakuRegExp)) {
            result = someJapanese.replace(zenkakuRegExp, function(match, key, value) {
                return zenkaku.indexOf(match, 0);
            });
        }
        else if (someJapanese.match(kanjiRegExp)) {
            someJapanese.replace(kanjiRegExp, function(match, key, value) {
                if (match === '十') { result  = result === 0 ? 10 : result * 10 }
                else                { result += kanji.indexOf(match, 0); }
            });
        } else {
            result = someJapanese;
        };

        return result;
    };

    Japan.eras = [
        {'name' : '平成', 'date' : new Date('Jan 08, 1989')},
        {'name' : '昭和', 'date' : new Date('Dec 25, 1926')},
        {'name' : '大正', 'date' : new Date('Jul 30, 1912')},
        {'name' : '明治', 'date' : new Date('Jan 25, 1868')}
    ];

    Japan.itenerateEras = function(someFunction) {
        var i, result;

        for (i = 0; i < Japan.eras.length; i++) {
            result = someFunction(Japan.eras[i]);
            if (result) { return result; }
        }
    };

    exports.toCommonEraYear = function(someDate) {
        return Japan.itenerateEras(function(era) {
            if (someDate >= era.date) { return era.name + Japan.calculateCommonEraYear(era.date, someDate); }
        });
    };

    exports.toWesternYear = function(someJapanese) {
        var matches = someJapanese.match(/([^元0-9０-９〇一二三四五六七八九十]+)([元0-9０-９〇一二三四五六七八九十]+)(年)/),
        name        = matches[1],
        year        = matches[2];

        return Japan.itenerateEras(function(era) {
            if (name === era.name) { return Japan.calculateWesternYear(era.date, year); }
        });
    };
})(typeof exports === 'undefined' ? this['Japan'] = {} : exports);
