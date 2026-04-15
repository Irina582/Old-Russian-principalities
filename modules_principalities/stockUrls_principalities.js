class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:5500';
    }

    getStocks() {
        return `${this.baseUrl}/stocks`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById() {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById() {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();