export default function ConfirmationButton(title, desc, onPositivePress = () => {}, onNegativePress = () => {}) {
    const res = window.confirm(`${title}\n${desc}`)
    if (res) onPositivePress()
    else onNegativePress()
}


