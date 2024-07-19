function partition(arr, left, right, pivotIndex, comparator) {
    const pivotValue = arr[pivotIndex];
    // Move pivot to end
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
    let storeIndex = left;

    for (let i = left; i < right; i++) {
        if (comparator(arr[i], pivotValue) < 0) {
            [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]];
            storeIndex++;
        }
    }

    // Move pivot to its final place
    [arr[right], arr[storeIndex]] = [arr[storeIndex], arr[right]];

    return storeIndex;
}

function quickselect(arr, left, right, n, comparator) {
    if (left === right) {
        return arr[left];
    }

    let pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    pivotIndex = partition(arr, left, right, pivotIndex, comparator);

    if (n === pivotIndex) {
        return arr[n];
    } else if (n < pivotIndex) {
        return quickselect(arr, left, pivotIndex - 1, n, comparator);
    } else {
        return quickselect(arr, pivotIndex + 1, right, n, comparator);
    }
}

export function getNthElement(arr, n, comparator) {
    if (n <= 0 || n > arr.length) {
        throw new Error("n is out of bounds");
    }
    return quickselect(arr, 0, arr.length - 1, n - 1, comparator);
}

// Example usage:
