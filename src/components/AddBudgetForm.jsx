import { useRef, useEffect } from "react"

// rrd import
import { Form, useFetcher } from "react-router-dom"

// library import
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"

function AddBudgetForm() {
    const fetcher = useFetcher()
    const isSubmiting = fetcher.state === "submitting"

    const formRef = useRef();
    const focusRef = useRef();
    useEffect(() => {
        if (!isSubmiting) {
            formRef.current.reset()
            formRef.current.focus()
        }
    }, [isSubmiting])


    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Create Budget
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="grid-xs">
                    <label htmlFor="newBudget"> Budget Name</label>
                    <input
                        type="text"
                        name="newBudget"
                        id="newBudget"
                        placeholder="e.g., Groceries"
                        required
                        ref={focusRef}
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount"> Amount</label>
                    <input
                        type="number"
                        name="newBudgetAmount"
                        id="newBudgetAmount"
                        placeholder="e.g., $360"
                        required
                        inputMode="decimal"
                    />
                </div>
                <input type="hidden" name="_action" value="createBudget" />
                <button type="submit" className="btn btn--dark" disabled={isSubmiting}>
                    {
                        isSubmiting ? (<span>Submitting ...</span>) : (
                            <>
                                <span>Create Budget</span>
                                <CurrencyDollarIcon width={20} />
                            </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}
export default AddBudgetForm