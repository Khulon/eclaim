/**
 * ConfirmationButton Function
 *
 * Displays a confirmation dialog box with the provided title and description.
 * Calls the onPositivePress function if the user confirms the action,
 * otherwise calls the onNegativePress function.
 *
 * @param {string} title - The title of the confirmation dialog box.
 * @param {string} desc - The description or message of the confirmation dialog box.
 * @param {function} onPositivePress - The callback function to be called if the user confirms the action.
 * @param {function} onNegativePress - The callback function to be called if the user cancels or declines the action.
 */
export default function ConfirmationButton(title, desc, onPositivePress = () => {}, onNegativePress = () => {}) {
    const res = window.confirm(`${title}\n${desc}`)
    if (res) onPositivePress()
    else onNegativePress()
}

/**
 * inputConfirmationButton Function
 *
 * Displays a prompt dialog box to input a description.
 * If a description is provided, it displays a confirmation dialog box with the provided confirmation message.
 * Calls the onPositivePress function with the description if the user confirms the action,
 * otherwise returns without any further action.
 *
 * @param {string} input - The prompt message to input a description.
 * @param {string} confirmation - The confirmation message shown in the confirmation dialog box.
 * @param {function} onPositivePress - The callback function to be called if the user confirms the action.
 */
export function inputConfirmationButton(input, confirmation, onPositivePress = () => {}) {
    var description = prompt(input);
    if (!description) return 
    var conf = confirm(confirmation + description);
    if (conf) onPositivePress(description)
    else return
}



