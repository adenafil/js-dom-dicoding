const submitAction = document.getElementById('formDataDiri');

submitAction.addEventListener('submit', (event) => {
    const inputNama = document.getElementById('inputNama').value;
    const inputDOmisili = document.getElementById('inputDomisili').value;
    const hiddenMessage = `Halo, ${inputNama}. Bagaimana cuacanyadi ${inputDOmisili} ?`;

    document.getElementById('messageAfterSubmit').innerText = hiddenMessage;
    event.preventDefault();
});