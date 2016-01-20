goog.provide('app.data');

/**
 *
 * @param {number} elapsed
 * @param {string} query
 * @constructor
 */
app.data.Query = function(elapsed, query) {
  this.elapsed = elapsed;
  this.query = query;
};

/**
 *
 * @returns {!app.data.Query}
 */
app.data.Query.rand = function() {
  var elapsed = Math.random() * 15;
  var query;

  if (Math.random() < 0.1) {
    query = 'vacuum';
  } else if (Math.random() < 0.2) {
    query = '<IDLE> in transaction';
  } else {
    query = 'SELECT blah FROM something';
  }

  return new app.data.Query(elapsed, query);
};

/**
 *
 * @type {number}
 * @protected
 */
app.data._nextId = 0;

/**
 *
 * @param {string} name
 * @constructor
 * @struct
 * @final
 */
app.data.Database = function(name) {
  this.id = app.data._nextId++;
  this.name = name;

  /** @type {?Array<!app.data.Query>} */
  this.queries = null;

  this.update();
};

/**
 *
 */
app.data.Database.prototype.update = function() {
  var queries = [];

  var r = Math.floor((Math.random() * 10) + 1);
  for (var j = 0; j < r; j++) {
    queries.push(app.data.Query.rand());
  }

  this.queries = queries;
};

app.data.EMPTY_QUERY = new app.data.Query(0.0, '');

/**
 * Get Top Five Queries.
 *
 * @returns {!Array.<!app.data.Query>}
 */
app.data.Database.prototype.getTopFiveQueries = function() {
  var qs = this.queries.slice();
  qs.sort(function(a, b) {
    return a.elapsed - b.elapsed;
  });
  qs = qs.slice(0, 5);
  while (qs.length < 5) {
    qs.push(app.data.EMPTY_QUERY);
  }
  return qs;
};

/**
 * Database List.
 *
 * @param {number} n
 * @constructor
 * @struct
 * @final
 */
app.data.DatabaseList = function(n) {
  /** @type {!Array<!app.data.Database>} */
  this.dbs = [];

  for (var i = 0; i < n; i++) {
    this.dbs.push(new app.data.Database('cluster' + i));
    this.dbs.push(new app.data.Database('cluster' + i + 'slave'));
  }
};

/**
 * Perform full update.
 */
app.data.DatabaseList.prototype.update = function() {
  var dbs = this.dbs;
  for (var i = 0; i < dbs.length; i++) {
    dbs[i] = new app.data.Database(dbs[i].name);
  }
};

/**
 * Perform random update.
 *
 * @param {number} r
 */
app.data.DatabaseList.prototype.randomUpdate = function(r) {
  var dbs = this.dbs;
  for (var i = 0; i < dbs.length; i++) {
    if (Math.random() < r) {
      dbs[i] = new app.data.Database(dbs[i].name);
    }
  }
};
