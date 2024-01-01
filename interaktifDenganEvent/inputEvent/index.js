document.addEventListener('DOMContentLoaded', () => {

    const inputMaxLengthOnLoad = document.getElementById('inputNama').maxLength;
    document.getElementById('sisaKarakter').innerText = inputMaxLengthOnLoad;

    document.getElementById('inputNama').addEventListener('input', () => {
        const jumlahKarakterDiketik = document.getElementById('inputNama').value.length;
        const jumlahKarakterMaksimal = document.getElementById('inputNama').maxLength;

        console.log('jumlahKarakterDiketik: ', jumlahKarakterDiketik);
        console.log('jumlahKarakterMaksimal: ', jumlahKarakterMaksimal);
        const sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiketik;
        document.getElementById('sisaKarakter').innerText = sisaKarakterUpdate.toString();

        if (sisaKarakterUpdate === 0)
        document.getElementById('sisaKarakter').innerText = 'Batas maksimal tercapai';
        if (sisaKarakterUpdate <= 5)
        document.getElementById('notifikasiSisaKarakter').style.color = 'red';
        else document.getElementById('notifikasiSisaKarakter').style.color = 'black';
    })

    document.getElementById('inputNama').addEventListener('focus', () => {
        console.log('inputNama: focus');
        document.getElementById('notifikasiSisaKarakter').style.visibility = 'visible';
    })

    document.getElementById('inputNama').addEventListener('blur', () => {
        console.log('inputNama : Blur');
        document.getElementById('notifikasiSisaKarakter').style.visibility = 'hidden';
    })

    document.getElementById('inputCaptcha').addEventListener('change', () => {
        console.log('inputChaptcha: change');

        const inputCaptcha = document.getElementById('inputCaptcha').value;
        const submitBottonStatus = document.getElementById('submitButton');

        if (inputCaptcha == 'PRNU') submitBottonStatus.removeAttribute('disabled');
        else submitBottonStatus.setAttribute('disabled', '');
    })

    document.getElementById('formDataDiri').addEventListener('submit', (event) => {
        const inputCaptcha = document.getElementById('inputCaptcha').value;

        if (inputCaptcha === 'PRNU') alert('Selamat! Captcha Anda Lolos :D');
        else {
            alert('Captcha Anda belum tepat :(');
            document.getElementById('submitButton').setAttribute('disabled', "");
        }
        event.preventDefault();
    })

    document.getElementById('inputCopy').addEventListener('copy', () => {
        alert('Anda telah men-copy sesuatu...')
    })

    document.getElementById('inputPaste').addEventListener('paste', () => alert('Anda telah mem-paste sebuah teks ...'));
    
});
