// add intterval thing
export const waait = () => new Promise(res => setTimeout(res, Math.random() * 2000))
// generateRandomColor
const generateRandomColor = () => {
  const existingBudgetsLength = fetchData("budgets")?.length ?? 0
  return `${existingBudgetsLength * 34} 65% 50%`
}
// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Get All item from local storage
export const getAllMetchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? []
  return data.filter((item) => item[key] === value)
}

// delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key)
  if (id) {
    const newData = existingData.filter((item) => item.id !== id)
    return localStorage.setItem(key, JSON.stringify(newData))
  }
  return localStorage.removeItem(key)
}

// create budget
export const createBudget = ({
  name, amount
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor()
  }
  const existingBudgets = fetchData('budgets') ?? []
  return localStorage.setItem("budgets",
    JSON.stringify([...existingBudgets, newItem]))
}

// create expense
export const createExpense = ({
  name, amount, budgetId
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId
  }
  const existingExpenses = fetchData('expenses') ?? []
  return localStorage.setItem("expenses",
    JSON.stringify([...existingExpenses, newItem]))
}

export const calculateSpentByBudget = (budgetId) => {
  const expanses = fetchData("expenses") ?? []
  const budgetSpent = expanses.reduce((acc, expense) => {
    // check if expenses.budgetid === budgetId that passing
    if (expense.budgetId !== budgetId) return acc

    // add current amount to total
    return acc += expense.amount

  }, 0)
  return budgetSpent
}
// total spent by budget


// FORMATTING
// formatting date to locale string
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString()


// formatting percentage
export const formattingPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  })
}

// Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD"
  })
} 