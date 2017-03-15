/**
 * @extends storeLocator.StaticDataFeed
 * @constructor
 */
function MedicareDataSource() {
  $.extend(this, new storeLocator.StaticDataFeed);

  var that = this;
/*  $.get('medicare.csv', function(data) { 
*/
/*	$.get('https://googlemaps.github.io/js-store-locator/examples/medicare.csv', function(data) {
*/
	$.get('https://akira-pak.github.io/unid-crim/docs/unidades2.csv', function(data) {

    that.setStores(that.parse_(data));
  });
}

/**
 * @const
 * @type {!storeLocator.FeatureSet}
 * @private
 */
MedicareDataSource.prototype.FEATURES_ = new storeLocator.FeatureSet(
  new storeLocator.Feature('Wheelchair-YES', 'filtro 1'),
  new storeLocator.Feature('Audio-YES', 'filtro 2')
);

/**
 * @return {!storeLocator.FeatureSet}
 */
MedicareDataSource.prototype.getFeatures = function() {
  return this.FEATURES_;
};

/**
 * @private
 * @param {string} csv
 * @return {!Array.<!storeLocator.Store>}
 */
MedicareDataSource.prototype.parse_ = function(csv) {
  var stores = [];
  var rows = csv.split('\n');
  var headings = this.parseRow_(rows[0]);

  for (var i = 1, row; row = rows[i]; i++) {
    row = this.toObject_(headings, this.parseRow_(row));
    var features = new storeLocator.FeatureSet;
/*	features.add(this.FEATURES_.getById('Wheelchair-' + row.Wheelchair));	*/ 	/* coluna Wheelchair */
/*	features.add(this.FEATURES_.getById('Audio-' + row.Audio));				*/	/* coluna Audio */

    var position = new google.maps.LatLng(row.Ycoord, row.Xcoord);			/* colunas Ycoord (latitude), Xcoord (longitude)*/

/*  var shop = this.join_([row.Shp_num_an, row.Shp_centre], ', ');  	*/	/* colunas Shp_num_an (unidade_crim), Shp_centre (unidade_pf) */
	var shop = this.join_([row.unidade_crim, row.unidade_pf], ', ');
/*  var locality = this.join_([row.Locality, row.Postcode], ', ');		*/	/* colunas Locality (municipio) , Postcode (unid_CEP) */
	var locality = this.join_([row.nome_municipio, row.unid_CEP], ', ');

/*  var store = new storeLocator.Store(row.uuid, position, features, {	*/	/* coluna uuid (id municipio) */
	var store = new storeLocator.Store(row.codigo_municipio_completo, position, features, {
/*    title: row.Fcilty_nam,											*/	/* coluna Fcility_nam (sigla_crim) */
	  title: row.sigla_crim,
/*    address: this.join_([shop, row.Street_add, locality], '<br>'),	*/	/* coluna Street_add (unid_endereco) */
	  address: this.join_([shop, row.unid_endereco, locality], '<br>'),
/*    hours: row.Hrs_of_bus												*/	/* coluna Hrs_of_bus */
	  hours: row.nome_municipio
    });
    stores.push(store);
  }
  return stores;
};

/**
 * Joins elements of an array that are non-empty and non-null.
 * @private
 * @param {!Array} arr array of elements to join.
 * @param {string} sep the separator.
 * @return {string}
 */
MedicareDataSource.prototype.join_ = function(arr, sep) {
  var parts = [];
  for (var i = 0, ii = arr.length; i < ii; i++) {
    arr[i] && parts.push(arr[i]);
  }
  return parts.join(sep);
};

/**
 * Very rudimentary CSV parsing - we know how this particular CSV is formatted.
 * IMPORTANT: Don't use this for general CSV parsing!
 * @private
 * @param {string} row
 * @return {Array.<string>}
 */
MedicareDataSource.prototype.parseRow_ = function(row) {
  // Strip leading quote.
  if (row.charAt(0) == '"') {
    row = row.substring(1);
  }
  // Strip trailing quote. There seems to be a character between the last quote
  // and the line ending, hence 2 instead of 1.
  if (row.charAt(row.length - 2) == '"') {
    row = row.substring(0, row.length - 2);
  }

  row = row.split('","');

  return row;
};

/**
 * Creates an object mapping headings to row elements.
 * @private
 * @param {Array.<string>} headings
 * @param {Array.<string>} row
 * @return {Object}
 */
MedicareDataSource.prototype.toObject_ = function(headings, row) {
  var result = {};
  for (var i = 0, ii = row.length; i < ii; i++) {
    result[headings[i]] = row[i];
  }
  return result;
};
