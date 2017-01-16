


function interpolationSearch( arr, key )
{
    let low = 0;
    let high = arr.length - 1;
    let mid;

    while (arr[high] != arr[low] && key >= arr[low] && key <= arr[high]) {
        mid = Math.floor(low + ((key - arr[low]) * (high - low) / (arr[high] - arr[low])));

        if(( mid != arr.length && arr[mid] < key  && arr[mid +1] > key )
            || ( mid != 0 && arr[mid-1] < key && arr[mid] > key )
            || ( mid == key )){
            return mid;
        }

        if (arr[mid] < key)
            low = mid + 1;
        else if (key < arr[mid])
            high = mid - 1;
        else
            return mid;
    }

    if (key == arr[low])
        return low ;
    else
        return -1;
}

module.exports = interpolationSearch;