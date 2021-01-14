export function toggle() {
    let toggle = document.getElementById('toggle');
    let nav = document.getElementById('nav');
    let acc = document.getElementById('acc');

    toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            acc.classList.toggle('active');
        }
    )
}

