class Urls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getItems() {
        return `${this.baseUrl}/principalities`;
    }

    getItemById(id) {
        return `${this.baseUrl}/principalities/${id}`;
    }

    createItem() {
        return `${this.baseUrl}/principalities`;
    }

    removeItemById(id) {
        return `${this.baseUrl}/principalities/${id}`;
    }

    updateItemById(id) {
        return `${this.baseUrl}/principalities/${id}`;
    }
}

export const urls = new Urls();