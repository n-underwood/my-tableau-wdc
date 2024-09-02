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
        var apiUrl = `https://query1.finance.yahoo.com/v7/finance/download/${symbol}?period1=0&period2=9999999999&interval=1d&events=history&includeAdjustedClose=true`;

        fetch(apiUrl)
            .then(response => response.text())
            .then(csv => {
                var lines = csv.split('\n');
                var tableData = [];

                for (var i = 1; i < lines.length; i++) {
                    var fields = lines[i].split(',');

                    if (fields.length === 7) {
                        tableData.push({
                            "date": fields[0],
                            "open": parseFloat(fields[1]),
                            "high": parseFloat(fields[2]),
                            "low": parseFloat(fields[3]),
                            "close": parseFloat(fields[4]),
                            "volume": parseInt(fields[6])
                        });
                    }
                }

                table.appendRows(tableData);
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
