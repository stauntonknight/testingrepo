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
	return goog.array.map(data, function(d) {
		return d.total;
	});
}
function getStats(data) {
	d = getStatsRaw(data);
	return {'length': d.length, 'mean':math.mean(d), 'sd': math.std(d)};
}
function plot(data, element) {
		$(element).append(JSON.stringify(data));
}

function startCharting(data) {
  var numEntries = Object.keys(data[Object.keys(data)[0]]).length;
  //male/female
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
  // Summary:
  var male = goog.array.filter(processedData, function(a) {
	  return a['gender'] == 'Male';
  });
  var female = goog.array.filter(processedData, function(a) {
	return a['gender'] == 'Female';
  });

  plotData(getStats(male), getStats(female), '.gender-summary')

  var departments = goog.array.map(processedData, function(p) {
	  return p.department;
  });
  departments = Array.from(new Set(departments));

  var departmentData = {};
  var maleDepartmentData;
  var femaleDepartmentData;
  for (var d in departments) {
	  maleDepartmentData = goog.array.filter(processedData, function(user) {
		  return user['gender'] == 'Male' && user['department'] == departments[d];
	  });
	  femaleDepartmentData = goog.array.filter(processedData, function(user) {
		return user['gender'] == 'Female' && user['department'] == departments[d];
	});
	$('.dgender-summary').append('Department :' + departments[d]);
	$('.dgender-summary').append('<br>');
	plotData(getStats(maleDepartmentData), getStats(femaleDepartmentData), '.dgender-summary')
  }
}

function plotData(maleData, femaleData, name) {
	$(name).append('Male');
	$(name).append('<br>');
	plot(maleData, name);
	$(name).append('<br>');
	$(name).append('FeMale');
	$(name).append('<br>');
	plot(femaleData, name)
	$(name).append('<br>');
}

