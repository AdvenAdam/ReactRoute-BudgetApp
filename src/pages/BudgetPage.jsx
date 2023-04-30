// rrd import
import { useLoaderData } from "react-router-dom"
// helpers
import { createExpense, deleteItem, getAllMetchingItems } from "../helpers"

// component
import AddExpenseForm from "../components/AddExpenseForm"
import BudgetItem from "../components/BudgetItem"
import Table from "../components/Table"

// library
import { toast } from "react-toastify"

// loader
export async function budgetLoader({ params }) {
    const budget = await getAllMetchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0]
    if (!budget) {
        throw new Error("The budget you're trying to find doesn't exist")
    }
    const expenses = await getAllMetchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    })

    return { budget, expenses }
}

// action
export async function budgetAction({ request }) {

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

    if (_action === "createExpense") {
        try {
            // create an expense
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} Created!`)
        } catch (e) {
            throw new Error("There was a problem creating your expense.")
        }
    }

    if (_action === "deleteExpense") {
        try {
            // delete an expense
            deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success(`Expense Deleted!`)
        } catch (e) {
            throw new Error("There was a problem deleting your expense.")
        }
    }
}

const BudgetPage = () => {
    const { budget, expenses } = useLoaderData()
    return (
        <div
            className="grid-lg"
            style={{
                "--accent": budget.color
            }}
        >
            <h1 className="h2">
                <span className="accent">{budget.name}</span> Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {
                expenses && expenses.length > 0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">{budget.name}</span> Expenses
                        </h2>
                        <Table expenses={expenses} showBudget={false} />
                    </div>
                )
            }
        </div>
    )
}
export default BudgetPage