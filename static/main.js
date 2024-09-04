// Initialize KlineChart
const chart = klinecharts.init('klineChart');

// Generate some sample data for the chart
const generateKlineData = (count = 100) => {
    const data = [];
    let baseTimestamp = new Date().getTime() - count * 60 * 1000;
    let basePrice = 59000;
    for (let i = 0; i < count; i++) {
        basePrice += Math.random() * 20 - 10;
        const kline = {
            timestamp: baseTimestamp + i * 60 * 1000,
            open: basePrice,
            high: basePrice + Math.random() * 15,
            low: basePrice - Math.random() * 15,
            close: basePrice + Math.random() * 10 - 5,
            volume: Math.random() * 1000 + 100
        };
        data.push(kline);
    }
    return data;
};

// Set chart data
chart.applyNewData(generateKlineData());

// Populate market pairs with sample data
const generateMarketPairs = () => {
    const pairs = [
        { name: 'ETH/USDT', basePrice: 3200 },
        { name: 'BNB/USDT', basePrice: 400 },
        { name: 'ADA/USDT', basePrice: 1.2 },
        { name: 'XRP/USDT', basePrice: 0.75 },
        { name: 'DOT/USDT', basePrice: 18 },
        { name: 'DOGE/USDT', basePrice: 0.15 },
        { name: 'UNI/USDT', basePrice: 22 },
        { name: 'LTC/USDT', basePrice: 180 },
        { name: 'LINK/USDT', basePrice: 28 },
        { name: 'BCH/USDT', basePrice: 550 }
    ];

    return pairs.map(pair => {
        const change = (Math.random() * 10 - 5).toFixed(2);
        const price = (pair.basePrice * (1 + change / 100)).toFixed(2);
        return {
            name: pair.name,
            price: price,
            change: change
        };
    });
};

// Populate market pairs table
const populateMarketPairs = () => {
    const pairs = generateMarketPairs();
    const marketPairsBody = document.getElementById('marketPairsBody');
    marketPairsBody.innerHTML = '';

    pairs.forEach(pair => {
        const changeClass = pair.change >= 0 ? 'price-up' : 'price-down';
        marketPairsBody.innerHTML += `
            <tr>
                <td>${pair.name}</td>
                <td>${pair.price}</td>
                <td class="${changeClass}">${pair.change}%</td>
            </tr>
        `;
    });
};

// Function to populate order book from DB
const populateOrderBookDB = () => {
    $.ajax({
        url: '/orderbook',
        method: 'GET',
        success: function(data) {
            const buylist = data.buylist;
            const selllist = data.selllist;
            const orderBookBodyDB = $("#orderBookBodyDB");

            // Clear the current table content
            orderBookBodyDB.empty();

            // Add Sell Orders
            selllist.forEach(function(order) {
                orderBookBodyDB.append(`
                    <tr class="text-danger">
                        <td>${order[0]}</td>
                        <td>${order[1]}</td>
                        <td>${order[2]}</td>
                    </tr>
                `);
            });

            // Add Buy Orders
            buylist.forEach(function(order) {
                orderBookBodyDB.append(`
                    <tr class="text-success">
                        <td>${order[0]}</td>
                        <td>${order[1]}</td>
                        <td>${order[2]}</td>
                    </tr>
                `);
            });
        },
        error: function(error) {
            console.log("Error fetching order book data:", error);
        }
    });
};

// jQuery for handling user inputs and form submissions
$(document).ready(function() {
    // Calculate buy total
    $("#buyPrice, #buyAmount").on("input", function() {
        var buyPrice = parseFloat($("#buyPrice").val()) || 0;
        var buyAmount = parseFloat($("#buyAmount").val()) || 0;
        var buyTotal = buyPrice * buyAmount;
        $("#buyTotal").val(buyTotal.toFixed(2));
    });

    // Calculate sell total
    $("#sellPrice, #sellAmount").on("input", function() {
        var sellPrice = parseFloat($("#sellPrice").val()) || 0;
        var sellAmount = parseFloat($("#sellAmount").val()) || 0;
        var sellTotal = sellPrice * sellAmount;
        $("#sellTotal").val(sellTotal.toFixed(2));
    });

    // Handle Buy BTC submission
    $("#buy form").submit(function(event) {
        event.preventDefault();
        var buyPrice = $("#buyPrice").val();
        var buyAmount = $("#buyAmount").val();

        $.ajax({
            url: "/buy_btc",
            method: "POST",
            data: JSON.stringify({
                price: buyPrice,
                amount: buyAmount
            }),
            contentType: "application/json",
            success: function(response) {
                alert("Buy Order Submitted: " + response.message);
            }
        });
    });

    // Handle Sell BTC submission
    $("#sell form").submit(function(event) {
        event.preventDefault();
        var sellPrice = $("#sellPrice").val();
        var sellAmount = $("#sellAmount").val();

        $.ajax({
            url: "/sell_btc",
            method: "POST",
            data: JSON.stringify({
                price: sellPrice,
                amount: sellAmount
            }),
            contentType: "application/json",
            success: function(response) {
                alert("Sell Order Submitted: " + response.message);
            }
        });
    });

    // Populate tables on page load
    populateOrderBookDB();
    populateMarketPairs();

    // Periodically update tables and chart data
    setInterval(() => {
        chart.updateData(generateKlineData(1)[0]); // Update chart
        populateOrderBookDB(); // Update order book from DB
        populateMarketPairs(); // Update market pairs with sample data
    }, 5000); // Updates every 5 seconds
});
