export function useCurrency() {
    function formatNumber(amount: number) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    }

    function numberToWords(number: number) {
        // Twelve zeroes for trillions
        return Math.abs(number) >= 1.0e12
            ? Math.abs(number / 1.0e12).toFixed(1) + ' trillion'
            : // Nine Zeroes for Billions
            Math.abs(number) >= 1.0e9
            ? Math.abs(number / 1.0e9).toFixed(1) + ' billion'
            : // Six Zeroes for Millions
            Math.abs(number) >= 1.0e6
            ? Math.abs(number / 1.0e6).toFixed(1) + ' million'
            : // Three Zeroes for Thousands
            Math.abs(number) >= 1.0e3
            ? Math.abs(number / 1.0e3).toFixed(1) + ' thousand'
            : Math.abs(number);
    }

    return {
        formatNumber,
        numberToWords,
    };
}

export function requestInterval(fn: Function, delay = 0) {
    const requestAnimFrame = (function() {
        return (
            window.requestAnimationFrame ||
            function(callback: Function) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    })();
    let start = new Date().getTime();
    let handle = null;
    function loop() {
        handle = requestAnimFrame(loop);
        const current = new Date().getTime(),
            delta = current - start;
        if (delta >= delay) {
            fn();
            start = new Date().getTime();
        }
    }
    handle = requestAnimFrame(loop);
    return handle;
}
