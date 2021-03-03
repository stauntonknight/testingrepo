goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.array');
goog.require('goog.events.EventType');
goog.require('goog.events.EventHandler');


function fetchData(callback) {
  $.getJSON('http://localhost:8080/data', callback);
}

function onLoad() {
  fetchData(startCharting);
}

function getStatsRaw(data) {
  if(data.length == 0) {
    return [0];
  }
	return goog.array.map(data, function(d) {
		return d.total;
	});
}

function getStats(data) {
	d = getStatsRaw(data);
	return {'length': d.length, 'mean':math.mean(d), 'sd': math.std(d)};
}

function plotStatistical(data, element) {
		$(element).append(JSON.stringify(data));
}

function plotSummarizedDataSingleSet(data, name) {
	$(name).append('<br>');
	$(name).append('Data');
	$(name).append('<br>');
	plotStatistical(data, name);
}


function plotGeneric(processedData, levers, name) {
  if (processedData.length == 0) {
    return;
  }
  if (levers.length == 0) {
    plotSummarizedDataSingleSet(getStats(processedData), name);
    return;
  }
  var lever = levers[0];
  var leverValues = goog.array.map(processedData, function(p) {
    return p[lever];
  });
  var leverDistinctValues = Array.from(new Set(leverValues));
  for (var ldv in leverDistinctValues) {
    $(name).append('Lever :' + lever + ' Value :' + leverDistinctValues[ldv] + '<br>');
	  plotGeneric(goog.array.filter(processedData, function(user) {
		  return user[lever] == leverDistinctValues[ldv];
    }), levers.slice(1), name);
    $(name).append('<br><br>');
  }
}


function startCharting(data) {
  var numEntries = Object.keys(data[Object.keys(data)[0]]).length;
  var keys = Object.keys(data);
  var processedData = [];
  for (var  i = 0 ; i < numEntries; i++) {
	  processedData[i] = {};
  }
  for (var key in keys) {
	  for (var i = 0; i < numEntries; i ++) {
	    processedData[i][keys[key]] = data[keys[key]][i];
	  }
  }
  plotGeneric(processedData, ['employmentType', 'gender'], '.gender-summary')
  plotGeneric(processedData, ['employmentType','departmet', 'gender'], '.gender-summary')
  plotGeneric(processedData, ['employmentType','city', 'department', 'gender'], '.gender-summary')
}

