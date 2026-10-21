export class ExpenseManager {
    constructor() {
        this.expenses = JSON.parse(
            localStorage.getItem("expenses")
        ) || []
    }
    add(expense) {
        this.expenses.push(expense)
        this.save()
    }
    remove(id) {
        this.expenses = this.expenses.filter(function(expense) {
            return expense.id !== id
        })
        this.save()
    }
    save() {
        localStorage.setItem(
            "expenses",
            JSON.stringify(this.expenses)
        )
    }

    replace(newExpenses) {
        this.expenses = newExpenses
        this.save()
    }

    clear() {
        this.expenses = []
        this.save()
    }
}


