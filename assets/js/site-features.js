let btnAbout = document.getElementById('btn-about'); 
let btnBaseStats = document.getElementById('btn-base-stats');
let infoValueAbout = document.getElementById('info-values-about');
let infoValueBase = document.getElementById('info-values-base');
let underline = document.getElementById('underline');

btnAbout.addEventListener('click', () => {
    infoValueAbout.style.display = "flex";
    infoValueBase.style.display = "none";
    underline.style.marginLeft = "0px";
})

btnBaseStats.addEventListener('click', () => {
    infoValueAbout.style.display = "none";
    infoValueBase.style.display = "flex";
    underline.style.marginLeft = "70px";
})



let closeWindow = document.getElementById('close-window');

closeWindow.addEventListener('click', () => {
    detailsWindow.style.display = "none";
})













