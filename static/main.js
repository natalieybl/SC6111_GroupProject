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

// Generate sample order book data
const generateOrderBook = () => {
    const buyOrders = [];
    const sellOrders = [];
    let basePrice = 59055.81;

    for (let i = 0; i < 10; i++) {
        const buyPrice = basePrice - i * 5 - Math.random() * 2;
        const sellPrice = basePrice + i * 5 + Math.random() * 2;
        const amount = Math.random() * 2 + 0.1;

        buyOrders.push({
            price: buyPrice.toFixed(2),
            amount: amount.toFixed(6),
            total: (buyPrice * amount).toFixed(2)
        });

        sellOrders.push({
            price: sellPrice.toFixed(2),
            amount: amount.toFixed(6),
            total: (sellPrice * amount).toFixed(2)
        });
    }

    return { buyOrders, sellOrders };
};

// Populate order book
const populateOrderBook = () => {
    const { buyOrders, sellOrders } = generateOrderBook();
    const orderBookBody = document.getElementById('orderBookBody');
    orderBookBody.innerHTML = '';

    sellOrders.reverse().forEach(order => {
        orderBookBody.innerHTML += `
            <tr class="text-danger">
                <td>${order.price}</td>
                <td>${order.amount}</td>
                <td>${order.total}</td>
            </tr>
        `;
    });

    buyOrders.forEach(order => {
        orderBookBody.innerHTML += `
            <tr class="text-success">
                <td>${order.price}</td>
                <td>${order.amount}</td>
                <td>${order.total}</td>
            </tr>
        `;
    });
};

// Generate sample market pairs data
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

// Populate market pairs
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

// Initial population
populateOrderBook();
populateMarketPairs();

// Update data periodically
setInterval(() => {
    chart.updateData(generateKlineData(1)[0]);
    populateOrderBook();
    populateMarketPairs();
}, 5000);