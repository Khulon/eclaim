export default function ConfirmationButton(title, desc, onPositivePress = () => {}, onNegativePress = () => {}) {
    const res = window.confirm(`${title}\n${desc}`)
    if (res) onPositivePress()
    else onNegativePress()
}

export function inputConfirmationButton(input, confirmation, onPositivePress = () => {}) {
    var description = prompt(input);
    if (!description) return 
    var conf = confirm(confirmation + description);
    if (conf) onPositivePress(description)
    else return
}



