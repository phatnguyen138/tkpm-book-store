import { makeRequest } from "./makeRequest";

export function createReport(token: string) {
    return makeRequest(
        '/reports/inventory',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                "note": "Note"
            }
        }
    );
}

export function updateReport(token: string, id: number, note: string) {
    return makeRequest(
        `/reports/inventory/${id}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                "note": note
            }
        }
    );
}

export function getReportList(token: string) {
    return makeRequest(
        '/reports/inventory',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }
    );
}

export function createReportDetail(token: string, id: number, book_id: number, initial_inventory_amount: number, final_inventory_amount: number) {
    return makeRequest(
        `/reports/inventory/${id}/details`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                "book_id": book_id,
                "initial_inventory_amount": initial_inventory_amount,
                "final_inventory_amount": final_inventory_amount
            }
        }
    );
}

export function getAllReports(token: string, id: number) {
    return makeRequest(
        `/reports/inventory/${id}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }
    );
}