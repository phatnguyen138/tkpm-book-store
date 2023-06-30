export type Report = {
    inventory_id: number,
    report_date: string,
    note: string,
    email: string
}

export type ReportInfo = {
    book_id: number,
    initial_inventory_amount: number,
    final_inventory_amount: number
}