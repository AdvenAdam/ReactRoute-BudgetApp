// rrd 
import { redirect } from "react-router-dom";
// helpers
import { deleteItem, getAllMetchingItems } from "../helpers";
// library
import { toast } from "react-toastify";

export function deleteBudget({ params }) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id
        })

        const associatedExpenses = getAllMetchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id
        })

        associatedExpenses.forEach((expenses) => {
            deleteItem({
                key: "expenses",
                id: expenses.id
            })
        });
        toast.success("Budget Deleted Successfully")
    } catch (e) {
        throw new Error("There was an error deleting your budget")

    }
    return redirect("/")
}