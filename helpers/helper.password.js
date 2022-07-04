import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()

export const hashPWD = async (oldplaintext, cb) => {
    return bcrypt.hash(oldplaintext, 10);
}

export const comparePWD = async ({ oldplaintext, hashedtext }, cb) => {
    const valide = await bcrypt.compare(oldplaintext, hashedtext)
    if(valide) cb(undefined, valide)
    else cb('error pwds not matching', undefined)
}
