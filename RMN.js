const inputVal = document.querySelector('#number');
const convertBtn = document.querySelector('#convert-btn');
const output = document.querySelector('#output');

output.classList.add("hide");

const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
];

inputVal.addEventListener('focus', function() {
    inputVal.classList.add('highlight');
});

inputVal.addEventListener('blur', function() {
    inputVal.classList.remove('highlight');
});

convertBtn.addEventListener('click', function() {
    output.classList.remove("hide");
    if (inputValidation()) {
        output.classList.remove("modifiedOp")
        const decimalNumber = parseInt(inputVal.value);
        const romanNumeral = convertToRoman(decimalNumber);
        output.textContent = `${romanNumeral}`;
    }
});

inputVal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        output.classList.remove("hide");
        if (inputValidation()) {
            output.classList.remove("modifiedOp")
            const decimalNumber = parseInt(inputVal.value);
            const romanNumeral = convertToRoman(decimalNumber);
            output.textContent = `${romanNumeral}`;
        }
    }
});

function inputValidation() {
    const decimalNumber = parseInt(inputVal.value);
    output.classList.add("modifiedOp");
    if (isNaN(decimalNumber) || inputVal.value.trim() === '') {
        output.textContent = "Please enter a valid number.";
        return false;
    } else if (decimalNumber <= 0) {
        output.textContent = "Please enter a number greater than or equal to 1.";
        return false;
    } else if (decimalNumber >= 4000) {
        output.textContent = "Please enter a number less than or equal to 3999";
        return false;
    }
    return true;
}

function convertToRoman(num) {
    function convert(num, romanNumerals) {
        if (num === 0) return '';
        for (let i = 0; i < romanNumerals.length; i++) {
            if (num >= romanNumerals[i].value) {
                return romanNumerals[i].numeral + convert(num - romanNumerals[i].value, romanNumerals);
            }
        }
    }

    return convert(num, romanNumerals);
}
