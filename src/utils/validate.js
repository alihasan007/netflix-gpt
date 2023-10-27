export const checkValidData = (email, password) => {
    const isEmailValid = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(email)
    const isPasswordValid = /^[A-Za-z]\w{7,14}$/.test(password)
    if (!isEmailValid) return 'Please correct the email'
    if (!isPasswordValid) return 'Please enter the correct password'
    return null
}