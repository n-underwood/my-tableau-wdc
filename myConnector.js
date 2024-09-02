(function() {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "date",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "open",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "high",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "low",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "close",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "volume",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "yahooFinanceData",
            alias: "Yahoo Finance Data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        var symbol = tableau.connectionData;
        fetch(`/getData?symbol=${symbol}`)
            .then(response => response.json())
            .then(data => {
                table.appendRows(data);
                doneCallback();
            });
    };

    tableau.registerConnector(myConnector);
})();

function fetchData() {
    var symbol = document.getElementById("symbol").value.trim();
    tableau.connectionData = symbol;
    tableau.connectionName = "Yahoo Finance Data for " + symbol;
    tableau.submit();
}
