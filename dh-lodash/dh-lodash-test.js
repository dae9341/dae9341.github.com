var test = _.size([1, 2, 3]);
console.log(test);
var users = [
    { 'user': 'barney',  'active': false },
    { 'user': 'fred',    'active': false },
    { 'user': 'pebbles', 'active': true }
];

console.log(_.size(users));
console.log(_.uniq([1, 1, 3]));
console.log(_.take(users, 2));

_.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
    console.log(n, key);
});