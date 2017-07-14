"use strict";

// a sketch of http://hackaday.com/2016/12/15/character-generation-in-144-bytes/

var table =
" ***   * *      "+
"        *** *   "+
"        ** * *  "+
" ** **  **      "+
"        ** *  * "+
"        ***    *"+
" *  * ** *      "+
"                ";

var lookup = [];

function buildLookup() { // transform the table into a 2D array. It's in an odd order to help scanline reconstruction.
    for (var x = 0; x < 16; x++){
        var row = [];
        for (var y = 0; y < 8; y++) {
            var d = (y*16)+x;
            row.push(table[d]);
        }
        lookup.push(row);
    }
}
buildLookup();

var glyphs = { // each glyph is an array of table columns (0 to 15). The original solution uses exactly 4 for each
    "A":[8,2,2,8],
    " ":[0,0,0,0],
    "H":[9,5,5,9],
    "E":[9,1,1,1],
    "L":[9,6,6,6],
    "O":[8,7,7,8]
};

function writeLine(str) { // single character string
    var indexes = [];
    for (var ch = 0; ch < str.length; ch++) {
        indexes = indexes.concat(glyphs[str[ch]]);
        indexes.push(0);
    }

    for (var row = 0; row < 8; row++){
        for (var col = 0; col < indexes.length; col++) {
            var P = lookup[indexes[col]][row];
            process.stdout.write(P);
        }
        process.stdout.write("\r\n");
    }
}

//console.log(JSON.stringify(lookup));
writeLine("HELLO A");
