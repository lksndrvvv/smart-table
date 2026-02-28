import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор - сделано
    const compare = createComparison(
        // rules.skipEmptyTargetValues,
        // rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
        ['skipEmptyTargetValues'],
        [rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)]
    );

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор - сделано
        return data.filter((row) => compare(row, state));
        // return data;
    }
}