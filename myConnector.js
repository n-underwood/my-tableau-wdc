(function() {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback) {
        schemaCallback([]);
    };

    myConnector.getData = function(table, doneCallback) {
        doneCallback();
    };

    tableau.registerConnector(myConnector);
})();

function fetchData() {
    tableau.connectionData = "test";
    tableau.submit();
}
