import { Injectable } from "@angular/core"

@Injectable({
    providedIn: "root"
})
export class ThemeService {
    private theme: "light" | "dark" = "light" // Default to light mode

    constructor() {}

    get currentTheme(): "light" | "dark" {
        return this.theme
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme !== null) {
            this.theme = savedTheme as "light" | "dark"
        } else {
            this.theme = "light" // Default to light mode
        }
        this.applyTheme()
    }
    toggleTheme() {
        this.theme = this.theme === "light" ? "dark" : "light"
        localStorage.setItem("theme", this.theme)
        this.applyTheme()
    }
    private applyTheme() {
        // Apply theme styles based on this.theme
        document.body.classList.toggle("dark", this.theme === "dark")
        // You can also use this.theme to apply styles to specific elements // Example: document.querySelector('#my-element').classList.toggle('dark', this.theme === 'dark');
    }
}
