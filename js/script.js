/*===== scroll sections active link =====*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

/*===== sticky navbar =====*/

let header = document.querySelector('header');

header.classList.toggle('sticky', window.scrollY > 100);

/*===== Skill icons =====*/

let lastText = '';

function animateText(text) {
    if (text === lastText) {
        return;
    }

    if (typeof typed !== 'undefined') {
        typed.destroy();
    }

    typed = new Typed('#info', {
        strings: [text],
        typeSpeed: 5
    });

    lastText = text;
}

animateText("Move cursor around icons to get info.") // default text

fetch('data/iconMessages.json')
    .then(response => response.json())
    .then(iconMessages => {
        Object.keys(iconMessages).forEach(iconId => {
            const iconElement = document.getElementById(iconId);
            if (iconElement) {
                iconElement.addEventListener("mouseover", () => {
                    animateText(iconMessages[iconId]);
                });
            }
        });
    })
    .catch(error => console.error('Error loading JSON file:', error));

/*===== Swiper =====*/

let swiper = new Swiper('.swiper-container', {
    cssMode: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    keyboard: true
});

/*===== working contact form =====*/

let quill = new Quill('#message', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{'size': ['small', false, 'large', 'huge']}],
            ['bold', 'italic', {'color': []}, {'background': []}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link']
        ]
    }
});

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");

function sendEmail() {

    messageContent = "" + quill.root.innerHTML

    const bodyMessage = `Name: ${fullName.value} | Email: ${email.value}<br><br>
    ${messageContent}`;

    Email.send({
        SecureToken: "994aa8d0-ac86-4a96-8c32-437644b68062",
        To: "aryel.soares22@gmail.com",
        From: "aryel.soares22@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message === "OK") {
                swal.fire({
                    title: "Success",
                    text: "Message sent successfully!",
                    icon: "success"
                });
            } else {
                swal.fire({
                    title: "Error",
                    text: "Something went wrong!",
                    icon: "error"
                });
            }
        }
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendEmail();
});


form.addEventListener("reset", () => {
    quill.setText('');
});