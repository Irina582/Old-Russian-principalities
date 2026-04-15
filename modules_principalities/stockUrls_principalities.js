class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/stocks_principalities`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks_principalities/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks_principalities`;
    }

    removeStockById() {
        return `${this.baseUrl}/stocks_principalities/${id}`;
    }

    updateStockById() {
        return `${this.baseUrl}/stocks_principalities/${id}`;
    }
}

export const stockUrls = new StockUrls();