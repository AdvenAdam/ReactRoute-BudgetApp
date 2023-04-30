import { useEffect, useRef } from "react"
// rrd import
import { useFetcher } from "react-router-dom"
// library import
import { PlusCircleIcon } from "@heroicons/react/24/solid"


function AddExpenseForm({ budgets }) {
    const fetcher = useFetcher()
    const formRef = useRef()
    const focusRef = useRef()
    const isSubmiting = fetcher.state === "submitting"

    useEffect(() => {
        if (!isSubmiting) {
            // clear
            formRef.current.reset()
            // refocus
            focusRef.current.focus()
        }
    }, [isSubmiting])


    return (
        <div className="form-wrapper">
            <h2 className="h3"> Add New{" "}
                <span className="accent">
                    {budgets.length === 1 && `${budgets.map
                        ((budg) => budg.name)}`}
                </span>{" "}
                Expense
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input
                            type="text"
                            name="newExpense"
                            id="newExpense"
                            placeholder="e.g., Coffee"
                            ref={focusRef}
                            required
                        />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount"> Expense Amount</label>
                        <input
                            type="number"
                            step="0.001"
                            inputMode="decimal"
                            name="newExpenseAmount"
                            id="newExpenseAmount"
                            placeholder="e.g., 3.50"
                            required
                        />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Catagery</label>
                    <select
                        name="newExpenseBudget"
                        id="newExpenseBudget"
                        required
                    >
                        {
                            budgets
                                .sort((a, b) => a.createdAt - b.createdAt)
                                .map((budget) => {
                                    return (
                                        <option value={budget.id} key={budget.id}>
                                            {budget.name}
                                        </option>
                                    )
                                })
                        }
                    </select>
                </div>
                <input type="hidden" name="_action" value="createExpense" />
                <button type="submit" className="btn btn--dark" disabled={isSubmiting}>
                    {
                        isSubmiting ? (<span>Submitting ...</span>) : (
                            <>
                                <span>Add Expense</span>
                                <PlusCircleIcon width={20} />
                            </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}
export default AddExpenseForm