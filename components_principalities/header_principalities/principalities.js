export class HeaderComponentPrincipalities {
    constructor(parent, onHomeClick) {
        this.parent = parent;
        this.onHomeClick = onHomeClick;
    }

    getHTML() {
        return `
            <header style="background-color: #38393d; padding: 12px 24px; margin-bottom: 20px;">
                <button id="home-button-header" style="background: none; border: none; color: white; font-size: 1.5rem; font-weight: 500; cursor: pointer;">
                    Древнерусские княжества
                </button>
            </header>
        `;
    }

    render() {
        this.parent.insertAdjacentHTML('afterbegin', this.getHTML());
        const homeBtn = document.getElementById('home-button-header');
        if (homeBtn && this.onHomeClick) {
            homeBtn.addEventListener('click', this.onHomeClick);
        }
    }
}