// utils/generateBankInfo.js

const COUNTRY_CODE = 'MA';
const BANK_CODE = '011';      // fixed for this bank
const AGENCY_CODE = '780';    // fixed, or per-branch

/**
 * Generates a random 16-digit account number (used inside the IBAN).
 */
// GENERATE ACCOUNT NUMBER
const generateAccountNumber = () => {
    const acc = "ACC";
    const randomNumer = Math.floor(100000000 + Math.random() * 900000000);
    return `${acc}-${randomNumer}`;
};


/**
 * Generates a valid IBAN (ISO 7064 mod 97-10 check digits) for a given account number.
 * If no account number is passed, generates a random one.
 */
function generateIban(accountNumber = generateAccountNumber()) {
  const cleanNumber = String(accountNumber).replace(/\D/g, '');   // ✅ يشيل الحروف والـ "-"

  const bbanWithoutKey = BANK_CODE + AGENCY_CODE + cleanNumber + '00';
  const ribKeyRemainder = BigInt(bbanWithoutKey) % 97n;
  const ribKey = (97n - ribKeyRemainder).toString().padStart(2, '0');

  const bban = BANK_CODE + AGENCY_CODE + cleanNumber + ribKey;

  const rearranged = bban + COUNTRY_CODE + '00';
  const numericString = rearranged
    .split('')
    .map((char) => (/[A-Z]/.test(char) ? (char.charCodeAt(0) - 55).toString() : char))
    .join('');

  const checkRemainder = BigInt(numericString) % 97n;
  const checkDigits = (98n - checkRemainder).toString().padStart(2, '0');

  return `${COUNTRY_CODE}${checkDigits}${bban}`;
}

/**
 * Returns the bank's BIC/SWIFT code. Fixed value since it's the same bank for every account.
 */
function generateBic() {
  return 'HOSBMAMC';
}

module.exports = { generateIban, generateBic, generateAccountNumber };