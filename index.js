/**
 * Created by darran on 14/08/2014.
 */
var cache = require('./lib/custos');

cache.set('pages', '0','This is a long page', ['part1', 'part2', 'part3']);
cache.set('pages', 'secondPages','This is a small page', 'part2');
cache.set('pages', 1,'This is a third page', ['part2', 'part4']);
cache.set('pages', 2,'This is a FOURTH page', ['part5', 'part4']);

cache.debug();

console.log(cache.get('pages',0));
console.log(cache.get('pages',1));
console.log(cache.get('pages',99));

cache.del('pages', 'secondPages');


cache.debug();